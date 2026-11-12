
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        clinicName: "",
        address: "",
    });

    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await api.get(`/doctors/${id}`);
                const doctor = response.data;

                setForm({
                    name: doctor.name || "",
                    email: doctor.email || "",
                    phone: doctor.phone || "",
                    clinicName: doctor.clinicName || "",
                    address: doctor.address || "",
                });

                setRates(
                    doctor.rates?.length
                        ? doctor.rates.map((rate) => ({
                              workType: rate.workType,
                              amount: String(rate.amount),
                          }))
                        : [{ workType: "", amount: "" }]
                );
            } catch (err) {
                setError("Unable to load doctor details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRateChange = (index, field, value) => {
        const updated = [...rates];
        updated[index][field] = value;
        setRates(updated);
    };

    const addRate = () => {
        setRates([...rates, { workType: "", amount: "" }]);
    };

    const removeRate = (index) => {
        if (rates.length <= 1) return;
        setRates(rates.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const phone = form.phone.trim();
        const email = form.email.trim();

        if (!/^[6-9]\d{9}$/.test(phone)) {
            setError("Enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (
            email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            setError("Enter a valid email address.");
            return;
        }

        const cleanedRates = rates.map((rate) => ({
            workType: rate.workType.trim(),
            amount: Number(rate.amount),
        }));

        if (
            cleanedRates.some(
                (rate) =>
                    !rate.workType ||
                    rate.amount <= 0 ||
                    !Number.isFinite(rate.amount)
            )
        ) {
            setError("Every work rate needs a work type and amount greater than zero.");
            return;
        }

        const workTypes = cleanedRates.map(
            (rate) => rate.workType.toLowerCase()
        );

        if (new Set(workTypes).size !== workTypes.length) {
            setError("Duplicate work types are not allowed.");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/doctors/${id}`, {
                ...form,
                name: form.name.trim(),
                email,
                phone,
                clinicName: form.clinicName.trim(),
                address: form.address.trim(),
                rates: cleanedRates,
            });

            navigate("/doctors");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update doctor.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading doctor...</div>;

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-3xl font-bold">Edit Doctor</h1>
                <p className="mb-8 text-slate-400">Update doctor details</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        ["name", "Doctor Name"],
                        ["email", "Email"],
                        ["phone", "Phone"],
                        ["clinicName", "Clinic Name"],
                        ["address", "Address"],
                    ].map(([name, label]) => (
                        <div key={name}>
                            <label className="mb-2 block text-sm text-slate-300">
                                {label}
                            </label>
                            <input
                                name={name}
                                type={name === "email" ? "email" : "text"}
                                value={form[name]}
                                onChange={handleChange}
                                required={name === "name" || name === "phone"}
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-indigo-500"
                            />
                        </div>
                    ))}

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Work Rates</h2>
                            <button
                                type="button"
                                onClick={addRate}
                                className="text-indigo-400"
                            >
                                + Add Rate
                            </button>
                        </div>

                        {rates.map((rate, index) => (
                            <div key={index} className="mb-3 flex gap-3">
                                <input
                                    placeholder="Work type"
                                    value={rate.workType}
                                    onChange={(e) =>
                                        handleRateChange(index, "workType", e.target.value)
                                    }
                                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-3"
                                />

                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Amount ₹"
                                    value={rate.amount}
                                    onChange={(e) =>
                                        handleRateChange(index, "amount", e.target.value)
                                    }
                                    className="w-32 rounded-lg border border-slate-700 bg-slate-900 px-3 py-3"
                                />

                                {rates.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRate(index)}
                                        className="text-red-400"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-500/10 p-3 text-red-400">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold disabled:opacity-50"
                        >
                            {saving ? "Updating..." : "Update Doctor"}
                        </button>

                        <Link
                            to="/doctors"
                            className="rounded-lg bg-slate-800 px-6 py-3"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDoctor;
