import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
function ITLayout({ children }) {
    return (
        <div className="flex h-screen">

            <div className="flex flex-col flex-1">
                <Navbar />
                <Sidebar />
                <main className="p-4 flex-1 overflow-y-auto">
                    {children ? children : <Outlet />}
                </main>
            </div>
        </div>)
}

export default ITLayout