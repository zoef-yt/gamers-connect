import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookmarksIcon, ExploreIcon, HalfMoonIcon, HomeIcon, LogoutIcon, MultipleHeartIcon, ProfileIcon, SunIcon } from '../../Assets/AllSVG.jsx';
import { useTheme } from '../../Context';

import './Navbar.css';
const Navbar = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const openSideBar = () => setIsSideBarOpen(true);
	const closeSideBar = () => setIsSideBarOpen(false);

	return (
		<>
			<nav className='navbar'>
				<NavLink className='navbar-brand ' to='/'>
					Gamers Connect
				</NavLink>
				<input type='search' className='text-field' placeholder='Search' />
				<div className='navbar-cta'>
					<div
						onClick={() => (!isSideBarOpen ? openSideBar() : closeSideBar())}
						className={`menu-burger ${isSideBarOpen && 'menu-burger-opened'}`}
					>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</nav>
			<aside className={`sidebar ${isSideBarOpen && 'sidebar-opened'}`}>
				<SideBarItem close={closeSideBar} icon={<HomeIcon />} text='Home' navigateTo='/' />
				<SideBarItem close={closeSideBar} icon={<ExploreIcon />} text='Explore' navigateTo='/explore' />
				<SideBarItem close={closeSideBar} icon={<BookmarksIcon />} text='Bookmark' navigateTo='/bookmark' />
				<SideBarItem close={closeSideBar} icon={<MultipleHeartIcon />} text='Liked' navigateTo='/likes' />
				<SideBarItem close={closeSideBar} icon={<ProfileIcon />} text='Profile' navigateTo='/my-profile' />

				<div onClick={toggleTheme} className='sidebar-item'>
					{theme === 'dark' ? <SunIcon className='header-icon' /> : <HalfMoonIcon className='header-icon' />}
					<p>Theme</p>
				</div>

				<SideBarItem close={closeSideBar} icon={<LogoutIcon />} text='Logout' />
			</aside>
		</>
	);
};

export { Navbar };

const SideBarItem = ({ close, icon, text, navigateTo = '/' }) => {
	const navigate = useNavigate();
	const changePage = () => {
		close();
		navigate(navigateTo);
	};
	return (
		<div onClick={changePage} className='sidebar-item'>
			{icon}
			<p>{text}</p>
		</div>
	);
};
