import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
	const { authUser } = useSelector((store) => store.auth);
	const location = useLocation();
	return authUser ? <Outlet /> : <Navigate to='/auth' state={{ from: location }} replace />;
};

export { PrivateRoute };
