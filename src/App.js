import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Footer, Navbar } from './Components';
import { AppRoutes } from './Components/Router/Router';
import { auth } from './Firebase/FirebaseAuth';
import { getSpecificUser } from './Firebase/FirebaseFirestore';
import './index.css';
import { useDispatch } from 'react-redux';
import { setTheme } from './store/Theme/ThemeSlice.jsx';
import { setAuthUser } from './store/Auth/AuthSlice';
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTheme());
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const authenticatedUser = await getSpecificUser(user.uid);
				dispatch(setAuthUser(authenticatedUser));
				if (!authenticatedUser)
					setTimeout(async () => {
						const authenticatedUser = await getSpecificUser(user.uid);
						dispatch(setAuthUser(authenticatedUser));
					}, 1000);
			} else {
				dispatch(setAuthUser(null));
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='app'>
			<Navbar />
			<AppRoutes />
			<Footer />
		</div>
	);
}

export { App };
