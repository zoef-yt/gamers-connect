import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context';

const PrivateRoute = () => {
	const { authUser } = useAuth();
	const location = useLocation();
	return authUser ? <Outlet /> : <Navigate to='/auth' state={{ from: location }} replace />;
};

export { PrivateRoute };
