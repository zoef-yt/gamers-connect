import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context';

const RestrictedRoute = (second) => {
	const { authUser } = useAuth();

	const location = useLocation();
	return authUser ? <Navigate to={location.state?.from?.pathname ?? '/'} state={{ from: location }} replace /> : <Outlet />;
};
export { RestrictedRoute };
