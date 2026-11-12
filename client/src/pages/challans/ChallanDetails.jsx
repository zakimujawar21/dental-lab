import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const ChallanDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChallan = async () => {
            try {
                const response = await api.get(`/challans/${id}`);
                setItem(response.data.challan || response.data);
            } catch (err) {
                setError("Unable to load challan details.");
            }
        };

        fetchChallan();
    }, [id]);

    if (error) return <div className="p-8 text-red-400">{error}</div>;
    if (!item) return <div className="p-8 text-white">Loading challan...</div>;

    const fields = [
        ["Challan Number", item.challanNumber],
        ["Patient Name", item.patientName],
        ["Doctor", item.doctor?.name],
        ["Clinic", item.doctor?.clinicName],
        ["Phone", item.doctor?.phone],
        ["Work Type", item.workType],
        ["Case Date", item.caseDate ? new Date(item.caseDate).toLocaleDateString() : "-"],
        ["Delivery Date", item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString() : "-"],
        ["Rate", `₹${item.rateAtTime}`],
        ["Status", item.status],
    ];

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
                    <h1 className="text-3xl font-bold">Challan Details</h1>

                    <div className="flex gap-3">
                        <Link to="/challans" className="rounded-lg bg-slate-800 px-5 py-3">
                            Back
                        </Link>

                        <button
                            onClick={() => window.print()}
                            className="rounded-lg bg-indigo-600 px-5 py-3"
                        >
                            Print Challan
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-700 bg-white p-8 text-slate-900 print:border-0">
                    <h2 className="text-center text-2xl font-bold">DENTAL LAB</h2>
                    <p className="mt-1 text-center text-sm text-slate-500">
                        Work Challan
                    </p>

                    <hr className="my-6 border-slate-300" />

                    <div className="grid gap-5 sm:grid-cols-2">
                        {fields.map(([label, value]) => (
                            <div key={label}>
                                <p className="text-sm text-slate-500">{label}</p>
                                <p className="mt-1 font-semibold">{value || "-"}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-between">
                        <p>Lab Signature: ______________</p>
                        <p>Doctor Signature: ______________</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallanDetails;