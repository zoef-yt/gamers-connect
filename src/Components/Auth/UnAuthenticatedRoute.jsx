import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnAuthenticatedRoute = () => {
	const { authUser } = useSelector((store) => store.auth);
	const location = useLocation();
	return authUser ? <Navigate to={location.state?.from?.pathname ?? '/'} state={{ from: location }} replace /> : <Outlet />;
};
export { UnAuthenticatedRoute };
