
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const AddPayment = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        doctor: "",
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",
        transactionId: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get("/doctors");
                setDoctors(response.data.doctors || response.data);
            } catch {
                setError("Unable to load doctors.");
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const amount = Number(form.amount);
        const validMethods = ["Cash", "UPI", "Bank Transfer", "Other"];

        if (!doctors.some((doctor) => doctor._id === form.doctor)) {
            setError("Please select a valid doctor.");
            return;
        }

        if (!form.amount || !Number.isFinite(amount) || amount <= 0) {
            setError("Payment amount must be greater than zero.");
            return;
        }

        if (!form.paymentDate) {
            setError("Please select a payment date.");
            return;
        }

        if (!validMethods.includes(form.paymentMethod)) {
            setError("Please select a valid payment method.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/payments", {
                ...form,
                amount,
                transactionId: form.transactionId.trim(),
                notes: form.notes.trim(),
            });

            navigate("/payments");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-3xl font-bold">Add Payment</h1>
                <p className="mb-8 text-slate-400">
                    Record a payment received from a doctor
                </p>

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
                            <option value="">Choose doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            name="amount"
                            min="0.01"
                            step="0.01"
                            value={form.amount}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Payment Date
                        </label>
                        <input
                            type="date"
                            name="paymentDate"
                            value={form.paymentDate}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Payment Method
                        </label>
                        <select
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        >
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Bank Transfer</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Transaction ID (optional)
                        </label>
                        <input
                            name="transactionId"
                            value={form.transactionId}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Notes (optional)
                        </label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows="3"
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
                            {loading ? "Saving..." : "Save Payment"}
                        </button>

                        <Link
                            to="/payments"
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

export default AddPayment;
