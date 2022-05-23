import { Routes, Route } from 'react-router-dom';
import { BookmarkPage, Home, LikedPostPage, PageNotFound, ProfilePage, ExplorePage, ChatPage } from '../../Pages';
import { Auth } from '../Auth/Auth';
import { PrivateRoute } from '../Auth/PrivateRoute';
import { UnAuthenticatedRoute } from '../Auth/UnAuthenticatedRoute';

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path='/bookmark' element={<BookmarkPage />} />
				<Route path='/likes' element={<LikedPostPage />} />
				<Route path='/chat' element={<ChatPage />} />
			</Route>

			<Route element={<UnAuthenticatedRoute />}>
				<Route path='/auth' element={<Auth />} />
			</Route>

			<Route path='/' element={<Home />} />
			<Route path='/profile/:uid' element={<ProfilePage />} />
			<Route path='*' element={<PageNotFound />} />
			<Route path='/explore' element={<ExplorePage />} />
		</Routes>
	);
};

export { AppRoutes };
