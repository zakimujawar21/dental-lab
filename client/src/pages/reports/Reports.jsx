import { useState } from "react";
import api from "../../services/api";

const Reports = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateReport = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/reports", {
                params: { startDate, endDate },
            });

            setReport(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to generate report.");
        } finally {
            setLoading(false);
        }
    };

    const money = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    const cards = report
        ? [
              ["Total Cases", report.totalCases],
              ["Completed Cases", report.completedCases],
              ["Pending Cases", report.pendingCases],
              ["Total Work Amount", money(report.totalWorkAmount)],
              ["Payments Received", money(report.totalPayments)],
          ]
        : [];

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="mb-8 mt-2 text-slate-400">
                Generate reports for a selected date range
            </p>

            <form
                onSubmit={generateReport}
                className="mb-8 grid max-w-3xl gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 sm:grid-cols-3"
            >
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="self-end rounded-lg bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </form>

            {error && <p className="mb-5 text-red-400">{error}</p>}

            {report && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <p className="text-sm text-slate-400">{label}</p>
                            <p className="mt-3 text-2xl font-bold">{value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reports;