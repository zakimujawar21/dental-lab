import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Challans = () => {
    const [challans, setChallans] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallans = async () => {
            try {
                const response = await api.get(`/challans?search=${search}`);
                setChallans(response.data.challans || []);
            } catch (error) {
                console.error("Failed to fetch challans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallans();
    }, [search]);

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Challans</h1>
                <p className="mt-2 text-slate-400">View and manage case challans</p>
            </div>

            <input
                type="text"
                placeholder="Search challan number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none"
            />

            {loading ? (
                <p>Loading challans...</p>
            ) : challans.length === 0 ? (
                <p className="text-slate-400">No challans found.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-300">
                            <tr>
                                <th className="p-4">Challan Number</th>
                                <th className="p-4">Patient</th>
                                <th className="p-4">Doctor</th>
                                <th className="p-4">Work Type</th>
                                <th className="p-4">Delivery Date</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {challans.map((item) => (
                                <tr key={item._id} className="border-t border-slate-800">
                                    <td className="p-4">{item.challanNumber}</td>
                                    <td className="p-4">{item.patientName}</td>
                                    <td className="p-4">{item.doctor?.name || "-"}</td>
                                    <td className="p-4">{item.workType}</td>
                                    <td className="p-4">
                                        {new Date(item.deliveryDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/challans/${item._id}`}
                                            className="text-indigo-400"
                                        >
                                            View / Print
                                        </Link>
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

export default Challans;