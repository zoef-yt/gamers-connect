import { Routes, Route } from 'react-router-dom';
import { Home, PageNotFound, ProfilePage } from '../../Pages';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/my-profile' element={<ProfilePage />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
};

export { AppRoutes };
