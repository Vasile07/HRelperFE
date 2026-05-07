import {Navigate} from 'react-router-dom';
import extractRoleFromJwt from "./extractRoleFromJwt.ts";

const ProtectedRoute: React.FC<{
    children: React.ReactElement;
    allowedRoles: string[];
}> = ({children, allowedRoles}) => {
    const role = extractRoleFromJwt();

    if (!role) {
        // No token or invalid token - redirect to login
        return <Navigate to="/Login" replace/>;
    }

    if (!allowedRoles.includes(role)) {
        // User doesn't have the required role - redirect to unauthorized or home
        return <Navigate to="/DiscoverJobs" replace/>;
    }

    return children;
};

export default ProtectedRoute