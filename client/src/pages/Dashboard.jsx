import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    ClipboardList,
    Clock,
    CheckCircle,
    CreditCard,
    TrendingUp,
} from "lucide-react";
import api from "../services/api";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");
                setData(response.data);
            } catch (err) {
                setError("Unable to load dashboard data.");
            }
        };

        fetchDashboard();
    }, []);

    const money = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    const stats = data
        ? [
              { label: "Total Doctors", value: data.totalDoctors, icon: Users },
              { label: "Total Cases", value: data.totalCases, icon: ClipboardList },
              { label: "Pending Cases", value: data.pendingCases, icon: Clock },
              { label: "In Progress", value: data.inProgressCases, icon: TrendingUp },
              { label: "Completed Cases", value: data.completedCases, icon: CheckCircle },
              { label: "Delivered Cases", value: data.deliveredCases, icon: CheckCircle },
              { label: "Total Work", value: money(data.totalWorkAmount), icon: CreditCard },
              { label: "Payments Received", value: money(data.totalPayments), icon: CreditCard },
              { label: "Outstanding Balance", value: money(data.outstandingBalance), icon: TrendingUp },
          ]
        : [];

    const quickLinks = [
        ["Add Doctor", "/doctors/add"],
        ["Add Case", "/cases/add"],
        ["Add Payment", "/payments/add"],
        ["View Reports", "/reports"],
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="mt-2 text-slate-400">
                    Overview of your dental lab operations
                </p>
            </div>

            {error && <p className="mb-5 text-red-400">{error}</p>}

            {!data ? (
                <p className="text-slate-400">Loading dashboard...</p>
            ) : (
                <>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-400">
                                            {stat.label}
                                        </p>
                                        <Icon size={21} className="text-indigo-400" />
                                    </div>

                                    <h2 className="mt-4 text-2xl font-bold text-white">
                                        {stat.value ?? 0}
                                    </h2>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-10">
                        <h2 className="mb-5 text-xl font-semibold text-white">
                            Quick Actions
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {quickLinks.map(([label, path]) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className="rounded-xl border border-slate-800 bg-slate-900 p-5 font-medium text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800"
                                >
                                    + {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;