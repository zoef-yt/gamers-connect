import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import { Sidebar } from './Sidebar';
const Navbar = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
			<Sidebar closeSideBar={closeSideBar} isSideBarOpen={isSideBarOpen} />
		</>
	);
};

export { Navbar };
