import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../services/hooks/hooks";

import { ProtectedRouteProps } from "../../services/types";

const ProtectedRoute: FC<ProtectedRouteProps> = ({ auth, children }) => {
    const location = useLocation();
    const userAuth = useAppSelector((store: any) => store.auth.user);

    if (userAuth && !auth) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />
    }

    if (!userAuth && auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;