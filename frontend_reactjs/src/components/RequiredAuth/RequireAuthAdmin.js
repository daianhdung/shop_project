import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";


const RequireAuthAdmin = () => {
    const context = useAuth()
    const location = useLocation()

    return (
        context.auth && context.admin
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuthAdmin