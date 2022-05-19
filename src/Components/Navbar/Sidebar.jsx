import {
	BookmarksIcon,
	ExploreIcon,
	HalfMoonIcon,
	HomeIcon,
	LoginIcon,
	LogoutIcon,
	MultipleHeartIcon,
	ProfileIcon,
	SunIcon,
} from '../../Assets/AllSVG.jsx';
import { logOut } from '../../Firebase/FirebaseAuth.js';
import { SideBarItem } from './SidebarItem.jsx';
import { setTheme } from '../../store/Theme/ThemeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isSideBarOpen, closeSideBar }) => {
	const { theme } = useSelector((store) => store.theme);
	const { authUser } = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loutOutHandler = () => {
		closeSideBar();
		logOut();
	};

	return (
		<aside className={`sidebar ${isSideBarOpen && 'sidebar-opened'}`}>
			<SideBarItem close={closeSideBar} icon={<HomeIcon />} text='Home' navigateTo='/' />
			<SideBarItem close={closeSideBar} icon={<ExploreIcon />} text='Explore' navigateTo='/explore' />
			<SideBarItem close={closeSideBar} icon={<BookmarksIcon />} text='Bookmark' navigateTo='/bookmark' />
			<SideBarItem close={closeSideBar} icon={<MultipleHeartIcon />} text='Liked' navigateTo='/likes' />
			<SideBarItem close={closeSideBar} icon={<ProfileIcon />} text='Profile' navigateTo={`/profile/${authUser?.uid}`} />

			<div title='Change theme' onClick={() => dispatch(setTheme())} className='sidebar-item'>
				{theme === 'dark' ? <SunIcon /> : <HalfMoonIcon />}
				<p>Theme</p>
			</div>

			{authUser ? (
				<div title='Logout' onClick={loutOutHandler} className='sidebar-item'>
					<LogoutIcon />
					<p>logOut</p>
				</div>
			) : (
				<div title='Sign up' onClick={() => navigate('/auth')} className='sidebar-item'>
					<LoginIcon />
					<p>Sign Up</p>
				</div>
			)}
		</aside>
	);
};

export { Sidebar };
