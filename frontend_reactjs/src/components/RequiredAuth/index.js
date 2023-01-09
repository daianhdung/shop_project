import React, { Fragment } from "react";
import { useLocation, Navigate, Route, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { DefaultLayout } from "~/layouts";
import Profile from "~/pages/Profile";


const RequireAuth = () => {
    const context = useAuth()
    const location = useLocation()

    return (
        context.auth
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth