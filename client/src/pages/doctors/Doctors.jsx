import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        try {
            const response = await api.get(`/doctors?search=${search}`);
            setDoctors(response.data.doctors || response.data);
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [search]);

    const deleteDoctor = async (id) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;

        try {
            await api.delete(`/doctors/${id}`);
            fetchDoctors();
        } catch (error) {
            alert("Unable to delete doctor");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Doctors</h1>
                    <p className="mt-2 text-slate-400">Manage your doctors</p>
                </div>

                <Link
                    to="/doctors/add"
                    className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold"
                >
                    + Add Doctor
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
            />

            {loading ? (
                <p>Loading doctors...</p>
            ) : doctors.length === 0 ? (
                <p className="text-slate-400">No doctors found.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-slate-300">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Clinic</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor._id} className="border-t border-slate-800">
                                    <td className="p-4">{doctor.name}</td>
                                    <td className="p-4">{doctor.clinicName || "-"}</td>
                                    <td className="p-4">{doctor.phone}</td>
                                    <td className="flex gap-3 p-4">
                                        <Link
                                            to={`/doctors/edit/${doctor._id}`}
                                            className="text-indigo-400"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteDoctor(doctor._id)}
                                            className="text-red-400"
                                        >
                                            Delete
                                        </button>
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

export default Doctors;