import { Outlet } from "react-router-dom";

function ProfileLayout({ children }) {
    return (
        <div>
            {children ? children : <Outlet />}
        </div>
    )
}

export default ProfileLayout