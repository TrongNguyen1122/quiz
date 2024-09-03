import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function PrivateRoute({ children, admin }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const role = useSelector((state) => state.user.account.role);
    if (admin) {
        if (role !== 'ADMIN') {
            return <Navigate to={'/'}></Navigate>;
        }
    }

    if (!isAuthenticated) {
        return <Navigate to={'/login'}></Navigate>;
    }
    return <>{children}</>;
}

export default PrivateRoute;
