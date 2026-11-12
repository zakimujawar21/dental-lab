
import { useState } from "react";
import { Menu, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ setOpen }) => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/95 px-3 py-3 backdrop-blur sm:px-5 md:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open navigation menu"
                    className="shrink-0 text-slate-300 lg:hidden"
                >
                    <Menu size={24} />
                </button>

                <div className="min-w-0">
                    <h1 className="text-base font-semibold text-white sm:text-lg">
                        Welcome Back!
                    </h1>
                    <p className="hidden text-xs text-slate-500 sm:block">
                        Manage your dental lab operations
                    </p>
                </div>
            </div>

            <div className="relative flex shrink-0 items-center">
                <button
                    onClick={() => setShowProfile(!showProfile)}
                    aria-label="Admin profile"
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-800"
                >
                    <UserCircle size={25} className="text-indigo-400" />
                    <span className="hidden max-w-32 truncate text-sm text-white sm:block">
                        {admin?.name || "Admin"}
                    </span>
                </button>

                {showProfile && (
                    <div className="absolute right-0 top-14 z-50 w-44 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-slate-800"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
