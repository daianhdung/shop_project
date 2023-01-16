import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";


const RequireNotLogin = () => {
    const context = useAuth()
    const location = useLocation()

    // context.auth
    //     ? <Outlet/>
    //     : <Navigate to="/login" state={{ from: location }} replace />
    if (context.auth && !context.admin) {
        return <Navigate to="/home" replace />
    } else if(context.auth && context.admin) {
        return <Navigate to="/admin-home" replace />
    }else{
        return <Outlet/>
    }


}

export default RequireNotLogin