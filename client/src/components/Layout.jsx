import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950">
            <Sidebar open={open} setOpen={setOpen} />

            <div className="min-h-screen lg:ml-64">
                <Header setOpen={setOpen} />

                <main className="p-5 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;