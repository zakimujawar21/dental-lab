
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";

const EditCase = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patientName: "",
        workType: "",
        caseDate: "",
        deliveryDate: "",
        status: "Pending",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const response = await api.get(`/cases/${id}`);
                const item = response.data;

                setForm({
                    patientName: item.patientName || "",
                    workType: item.workType || "",
                    caseDate: item.caseDate
                        ? new Date(item.caseDate).toISOString().split("T")[0]
                        : "",
                    deliveryDate: item.deliveryDate
                        ? new Date(item.deliveryDate).toISOString().split("T")[0]
                        : "",
                    status: item.status || "Pending",
                });
            } catch (err) {
                setError("Unable to load case details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCase();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.patientName.trim()) {
            setError("Patient name is required.");
            return;
        }

        if (!form.workType.trim()) {
            setError("Work type is required.");
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

        const validStatuses = [
            "Pending",
            "In Progress",
            "Completed",
            "Delivered",
        ];

        if (!validStatuses.includes(form.status)) {
            setError("Please select a valid case status.");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/cases/${id}`, {
                ...form,
                patientName: form.patientName.trim(),
                workType: form.workType.trim(),
            });

            navigate("/cases");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update case.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading case...</div>;

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-3xl font-bold">Edit Case</h1>
                <p className="mb-8 text-slate-400">Update case information</p>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <input
                            name="workType"
                            value={form.workType}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
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

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Case Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Delivered</option>
                        </select>
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
                            {saving ? "Updating..." : "Update Case"}
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

export default EditCase;
