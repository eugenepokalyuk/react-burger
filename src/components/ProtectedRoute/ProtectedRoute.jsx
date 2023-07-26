import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ auth, children }) => {
    const location = useLocation();
    const userAuth = useSelector((store) => store.auth.user);

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