import { Routes, Route } from 'react-router-dom';
import { BookmarkPage, Home, LikedPostPage, PageNotFound, ProfilePage } from '../../Pages';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/my-profile' element={<ProfilePage />} />
			<Route path='/bookmark' element={<BookmarkPage />} />
			<Route path='/likes' element={<LikedPostPage />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
};

export { AppRoutes };
