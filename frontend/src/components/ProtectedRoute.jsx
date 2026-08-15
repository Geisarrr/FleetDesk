import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // belum login
    if (!token || !user) {
        return <Navigate to="/login" />;
    }


    // cek role
    if (roles && !roles.includes(user.role.name)) {
        return <Navigate to="/dashboard" />;
    }


    return children;
}