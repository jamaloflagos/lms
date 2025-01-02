import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRole }) => {
    const location = useLocation()
    const { role } = useAuth()  

    const content = (
        allowedRole.includes(role)
            ? <Outlet />
            : <Navigate to={`/login`} state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth