import { Outlet } from "react-router-dom";

function DashboardLayout({ children }) {
    return (
        <div>
            {children ? children : <Outlet />}
        </div>
    )
}

export default DashboardLayout