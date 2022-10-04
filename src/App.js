import { useEffect } from 'react';
import { Footer, Navbar } from './Components';
import { AppRoutes } from './Components/Router/Router';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './store/Theme/ThemeSlice';
import ModalComponent from './Components/Modal/Modal';
import { startListeners, startUserDetailListener } from './Firebase/FirebaseListeners';
import { LoaderSvg } from './Assets/AllSVG';
function App() {
	const dispatch = useDispatch();

	const { authUser, isLoading } = useSelector((store) => store.auth);
	useEffect(() => {
		dispatch(setTheme());
		startListeners(dispatch);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (authUser) {
			startUserDetailListener(dispatch, authUser.uid);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);
	return (
		<div className='app'>
			{isLoading && <Loader />}
			<ModalComponent />
			<Navbar />
			<AppRoutes />
			<Footer />
		</div>
	);
}

export { App };

const Loader = () => {
	return (
		<div className='global-loader'>
			<LoaderSvg />
		</div>
	);
};
