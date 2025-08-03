import { ToastContainer } from "react-toastify";
import StoreProvider from "../store/StoreProvider";
import Sidebar from "./_components/Sidebar/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <div className="w-full h-full bg-zinc-100">
                <div className="w-full h-full grid grid-cols-5 gap-5">
                    <div className={`w-full h-full col-span-1`}>
                        <Sidebar />
                    </div>
                    <div className="w-full h-full col-span-4 p-5 overflow-y-scroll">
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </StoreProvider>
    );
}
