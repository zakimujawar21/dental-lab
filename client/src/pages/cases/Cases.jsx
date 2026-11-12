import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Cases = () => {
    const [cases, setCases] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCases = async () => {
        try {
            const response = await api.get(`/cases?search=${search}`);
            setCases(response.data.cases || response.data);
        } catch (error) {
            console.error("Failed to fetch cases:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCases();
    }, [search]);

    const deleteCase = async (id) => {
        if (!window.confirm("Are you sure you want to delete this case?")) return;

        try {
            await api.delete(`/cases/${id}`);
            fetchCases();
        } catch (error) {
            alert("Unable to delete case");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Cases</h1>
                    <p className="mt-2 text-slate-400">Manage dental lab cases</p>
                </div>

                <Link to="/cases/add" className="rounded-lg bg-indigo-600 px-5 py-3">
                    + Add Case
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search patient or challan number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none"
            />

            {loading ? (
                <p>Loading cases...</p>
            ) : cases.length === 0 ? (
                <p className="text-slate-400">No cases found.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-300">
                            <tr>
                                <th className="p-4">Patient</th>
                                <th className="p-4">Doctor</th>
                                <th className="p-4">Work Type</th>
                                <th className="p-4">Challan</th>
                                <th className="p-4">Delivery</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cases.map((item) => (
                                <tr key={item._id} className="border-t border-slate-800">
                                    <td className="p-4">{item.patientName}</td>
                                    <td className="p-4">{item.doctor?.name || "-"}</td>
                                    <td className="p-4">{item.workType}</td>
                                    <td className="p-4">{item.challanNumber}</td>
                                    <td className="p-4">
                                        {item.deliveryDate
                                            ? new Date(item.deliveryDate).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="p-4">{item.status}</td>
                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <Link to={`/cases/${item._id}`} className="text-indigo-400">
                                                View
                                            </Link>
                                            <Link to={`/cases/edit/${item._id}`} className="text-yellow-400">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteCase(item._id)}
                                                className="text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default Cases;