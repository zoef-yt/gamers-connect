import { BookmarksIcon, ExploreIcon, HalfMoonIcon, HomeIcon, LogoutIcon, MultipleHeartIcon, ProfileIcon, SunIcon } from '../../Assets/AllSVG.jsx';
import { logOut } from '../../Firebase/FirebaseAuth.js';
import { SideBarItem } from './SidebarItem.jsx';
import { setTheme } from '../../store/Theme/ThemeSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = ({ isSideBarOpen, closeSideBar }) => {
	const { theme } = useSelector((store) => store.theme);
	const dispatch = useDispatch();
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
			<SideBarItem close={closeSideBar} icon={<ProfileIcon />} text='Profile' navigateTo='/my-profile' />

			<div onClick={() => dispatch(setTheme())} className='sidebar-item'>
				{theme === 'dark' ? <SunIcon /> : <HalfMoonIcon />}
				<p>Theme</p>
			</div>
			<div onClick={loutOutHandler} className='sidebar-item'>
				<LogoutIcon />
				<p>logOut</p>
			</div>
		</aside>
	);
};

export { Sidebar };
