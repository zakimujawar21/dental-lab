import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get("/payments");
                setPayments(response.data.payments || response.data);
            } catch (error) {
                console.error("Failed to fetch payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const money = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="mt-2 text-slate-400">
                        Manage doctor payments
                    </p>
                </div>

                <Link
                    to="/payments/add"
                    className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold"
                >
                    + Add Payment
                </Link>
            </div>

            {loading ? (
                <p>Loading payments...</p>
            ) : payments.length === 0 ? (
                <p className="text-slate-400">No payments recorded yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-300">
                            <tr>
                                <th className="p-4">Doctor</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Method</th>
                                <th className="p-4">Transaction ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                    key={payment._id}
                                    className="border-t border-slate-800"
                                >
                                    <td className="p-4">
                                        {payment.doctor?.name || "-"}
                                    </td>
                                    <td className="p-4 font-semibold text-emerald-400">
                                        {money(payment.amount)}
                                    </td>
                                    <td className="p-4">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="p-4">
                                        {payment.transactionId || "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Payments;