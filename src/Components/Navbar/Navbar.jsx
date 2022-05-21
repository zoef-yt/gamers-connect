import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

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
				<SearchBar />
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

const SearchBar = () => {
	const navigate = useNavigate();
	const { allUsers } = useSelector((store) => store.allUsers);
	const [search, setSearch] = useState('');
	const searchedData = search !== '' ? allUsers.filter((user) => user.displayName.toLowerCase().includes(search.toLowerCase())) : allUsers;
	return (
		<div className='relative searchbar-holder'>
			<input type='search' className='text-field' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
			<div className='search-data'>
				{searchedData.map((user) => {
					return (
						<div
							key={user.uid}
							className='flex-row'
							onClick={() => {
								navigate(`/profile/${user.uid}`);
							}}
						>
							<img src={user.photoURL} alt={user.displayName} />
							<p>{user.displayName}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
