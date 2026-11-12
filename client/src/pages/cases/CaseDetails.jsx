import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const CaseDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const response = await api.get(`/cases/${id}`);
                setItem(response.data);
            } catch (err) {
                setError("Unable to load case details.");
            }
        };

        fetchCase();
    }, [id]);

    if (error) return <div className="p-8 text-red-400">{error}</div>;
    if (!item) return <div className="p-8 text-white">Loading case...</div>;

    const details = [
        ["Patient Name", item.patientName],
        ["Doctor", item.doctor?.name || "-"],
        ["Clinic", item.doctor?.clinicName || "-"],
        ["Phone", item.doctor?.phone || "-"],
        ["Work Type", item.workType],
        ["Case Date", new Date(item.caseDate).toLocaleDateString()],
        ["Delivery Date", new Date(item.deliveryDate).toLocaleDateString()],
        ["Challan Number", item.challanNumber],
        ["Rate", `₹${item.rateAtTime}`],
        ["Status", item.status],
    ];

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Case Details</h1>
                        <p className="mt-2 text-slate-400">Complete case information</p>
                    </div>

                    <Link
                        to="/cases"
                        className="rounded-lg bg-slate-800 px-5 py-3"
                    >
                        Back
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {details.map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                        >
                            <p className="text-sm text-slate-400">{label}</p>
                            <p className="mt-2 font-semibold">{value || "-"}</p>
                        </div>
                    ))}
                </div>

                <Link
                    to={`/cases/edit/${item._id}`}
                    className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3"
                >
                    Edit Case
                </Link>
            </div>
        </div>
    );
};

export default CaseDetails;