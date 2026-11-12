import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    FileText,
    Receipt,
    CreditCard,
    BarChart3,
    X,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Doctors", path: "/doctors", icon: Users },
    { name: "Cases", path: "/cases", icon: ClipboardList },
    { name: "Challans", path: "/challans", icon: FileText },
    { name: "Billing", path: "/billing", icon: Receipt },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Reports", path: "/reports", icon: BarChart3 },
];

const Sidebar = ({ open, setOpen }) => {
    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-5 transition-transform duration-300 lg:translate-x-0 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Dental<span className="text-indigo-400">Lab</span>
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Management System
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-slate-400 lg:hidden"
                    >
                        <X size={22} />
                    </button>
                </div>

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Main Menu
                </p>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={19} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-800 pt-5">
                    <p className="text-xs text-slate-500">
                        Dental Lab Management
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                        Admin Panel
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;