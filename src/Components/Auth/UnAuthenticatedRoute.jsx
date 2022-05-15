import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context';

const UnAuthenticatedRoute = () => {
	const { authUser } = useAuth();

	const location = useLocation();
	return authUser ? <Navigate to={location.state?.from?.pathname ?? '/'} state={{ from: location }} replace /> : <Outlet />;
};
export { UnAuthenticatedRoute };
