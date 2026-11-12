
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const AddCase = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        doctor: "",
        patientName: "",
        workType: "",
        caseDate: new Date().toISOString().split("T")[0],
        deliveryDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get("/doctors");
                setDoctors(response.data.doctors || response.data);
            } catch (err) {
                setError("Unable to load doctors.");
            }
        };

        fetchDoctors();
    }, []);

    const selectedDoctor = doctors.find(
        (doctor) => doctor._id === form.doctor
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "doctor" ? { workType: "" } : {}),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.doctor || !selectedDoctor) {
            setError("Please select a valid doctor.");
            return;
        }

        if (!form.patientName.trim()) {
            setError("Patient name is required.");
            return;
        }

        if (!form.workType) {
            setError("Please select a work type.");
            return;
        }

        const selectedRate = selectedDoctor.rates?.find(
            (rate) => rate.workType === form.workType
        );

        if (!selectedRate) {
            setError("Please select a valid work type for this doctor.");
            return;
        }

        if (!form.caseDate || !form.deliveryDate) {
            setError("Please select both case date and delivery date.");
            return;
        }

        if (form.deliveryDate < form.caseDate) {
            setError("Delivery date cannot be before case date.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/cases", {
                ...form,
                patientName: form.patientName.trim(),
            });

            navigate("/cases");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add case.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-3xl font-bold">Add New Case</h1>
                <p className="mb-8 text-slate-400">Enter patient and case details</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Select Doctor
                        </label>
                        <select
                            name="doctor"
                            value={form.doctor}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        >
                            <option value="">Choose Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name} - {doctor.clinicName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Patient Name
                        </label>
                        <input
                            name="patientName"
                            value={form.patientName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Work Type
                        </label>
                        <select
                            name="workType"
                            value={form.workType}
                            onChange={handleChange}
                            required
                            disabled={!selectedDoctor}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        >
                            <option value="">Choose Work Type</option>
                            {selectedDoctor?.rates?.map((rate, index) => (
                                <option key={index} value={rate.workType}>
                                    {rate.workType} - ₹{rate.amount}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Case Date
                        </label>
                        <input
                            type="date"
                            name="caseDate"
                            value={form.caseDate}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Delivery Date
                        </label>
                        <input
                            type="date"
                            name="deliveryDate"
                            value={form.deliveryDate}
                            onChange={handleChange}
                            min={form.caseDate}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-500/10 p-3 text-red-400">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || doctors.length === 0}
                            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Case"}
                        </button>

                        <Link to="/cases" className="rounded-lg bg-slate-800 px-6 py-3">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCase;
