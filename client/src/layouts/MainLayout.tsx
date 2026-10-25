import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <div className="relative z-50">
                <Navbar />
            </div>
            <main className="relative z-0 flex-1 overflow-hidden">

                <Outlet />
            </main>

        </div>
    )
}
