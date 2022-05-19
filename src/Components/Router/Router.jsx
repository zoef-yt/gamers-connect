import { Routes, Route } from 'react-router-dom';
import { BookmarkPage, Home, LikedPostPage, PageNotFound, ProfilePage } from '../../Pages';
import { Auth } from '../Auth/Auth';
import { PrivateRoute } from '../Auth/PrivateRoute';
import { UnAuthenticatedRoute } from '../Auth/UnAuthenticatedRoute';

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path='/my-profile' element={<ProfilePage />} />
				<Route path='/bookmark' element={<BookmarkPage />} />
				<Route path='/likes' element={<LikedPostPage />} />
			</Route>

			<Route element={<UnAuthenticatedRoute />}>
				<Route path='/auth' element={<Auth />} />
			</Route>

			<Route path='/' element={<Home />} />
			<Route path='/profile/:id' element={<ProfilePage />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
};

export { AppRoutes };
