import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const InvoiceDetails = () => {
    const { doctorId } = useParams();
    const [billing, setBilling] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await api.get(`/billing/doctor/${doctorId}`);
                setBilling(response.data);
            } catch (err) {
                setError("Unable to load invoice.");
            }
        };

        fetchBilling();
    }, [doctorId]);

    if (error) return <div className="p-8 text-red-400">{error}</div>;
    if (!billing) return <div className="p-8 text-white">Loading invoice...</div>;

    const money = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    const doctor = billing.doctor || {};

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
                    <h1 className="text-3xl font-bold">Invoice Details</h1>

                    <div className="flex gap-3">
                        <Link to="/billing" className="rounded-lg bg-slate-800 px-5 py-3">
                            Back
                        </Link>

                        <button
                            onClick={() => window.print()}
                            className="rounded-lg bg-indigo-600 px-5 py-3"
                        >
                            Print Invoice
                        </button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-8 text-slate-900">
                    <div className="flex flex-wrap justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">DENTAL LAB</h2>
                            <p className="text-sm text-slate-500">Billing Statement</p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold">Invoice</p>
                            <p className="text-sm text-slate-500">
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <hr className="my-6 border-slate-300" />

                    <h3 className="mb-3 font-bold">Doctor Information</h3>
                    <p>{doctor.name || "Doctor"}</p>
                    <p className="text-sm text-slate-500">
                        {doctor.clinicName || ""}
                    </p>
                    <p className="text-sm text-slate-500">
                        {doctor.phone || ""}
                    </p>

                    <div className="my-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-slate-100 p-4">
                            <p className="text-sm text-slate-500">Total Work</p>
                            <p className="mt-1 text-xl font-bold">
                                {money(billing.totalWorkAmount)}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-100 p-4">
                            <p className="text-sm text-slate-500">Payments Received</p>
                            <p className="mt-1 text-xl font-bold">
                                {money(billing.totalPayments)}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-100 p-4">
                            <p className="text-sm text-slate-500">Balance Due</p>
                            <p className="mt-1 text-xl font-bold text-amber-700">
                                {money(billing.remainingBalance)}
                            </p>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Thank you for your business.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;