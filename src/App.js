import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Footer, Navbar } from './Components';
import { AppRoutes } from './Components/Router/Router';
import { auth } from './Firebase/FirebaseAuth';
import { getAllUsers, getSpecificUser } from './Firebase/FirebaseFirestore';
import './index.css';
import { useDispatch } from 'react-redux';
import { setTheme } from './store/Theme/ThemeSlice';
import { setAuthUser } from './store/Auth/AuthSlice';
import { setAllUser } from './store/AllUser/AllUserSlice';
import ModalComponent from './Components/Modal/Modal';
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		getAllUserHandler();
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

	const getAllUserHandler = async () => {
		const users = await getAllUsers();
		dispatch(setAllUser(users));
	};

	return (
		<div className='app'>
			<ModalComponent />
			<Navbar />
			<AppRoutes />
			<Footer />
		</div>
	);
}

export { App };
