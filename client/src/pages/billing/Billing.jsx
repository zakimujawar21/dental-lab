import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Billing = () => {
    const [doctors, setDoctors] = useState([]);
    const [billingData, setBillingData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await api.get("/doctors");
                const list = response.data.doctors || response.data;
                setDoctors(list);

                const results = await Promise.all(
                    list.map(async (doctor) => {
                        try {
                            const res = await api.get(`/billing/doctor/${doctor._id}`);
                            return {
                                doctor,
                                billing: res.data,
                            };
                        } catch {
                            return { doctor, billing: null };
                        }
                    })
                );

                setBillingData(results);
            } catch (error) {
                console.error("Billing fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBilling();
    }, []);

    const money = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    if (loading) {
        return <div className="min-h-screen bg-slate-950 p-8 text-white">Loading billing...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <h1 className="text-3xl font-bold">Billing</h1>
            <p className="mb-8 mt-2 text-slate-400">
                Doctor-wise billing overview
            </p>

            {billingData.length === 0 ? (
                <p className="text-slate-400">No doctors found.</p>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {billingData.map(({ doctor, billing }) => (
                        <div
                            key={doctor._id}
                            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <h2 className="text-xl font-semibold">
                                {doctor.name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                {doctor.clinicName || "No clinic"}
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Total Work</span>
                                    <span>{money(billing?.totalWorkAmount)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-400">Payments</span>
                                    <span>{money(billing?.totalPayments)}</span>
                                </div>

                                <div className="flex justify-between border-t border-slate-700 pt-3">
                                    <span className="font-semibold">Balance Due</span>
                                    <span className="font-bold text-amber-400">
                                        {money(billing?.remainingBalance)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/billing/${doctor._id}`}
                                className="mt-6 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold"
                            >
                                View Invoice
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Billing;