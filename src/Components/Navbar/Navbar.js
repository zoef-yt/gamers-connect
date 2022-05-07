import { NavLink, useNavigate } from 'react-router-dom';
import { HalfMoonIcon, SunIcon, VideoWithTVIcon } from '../../../Assets/svg/AllSVG';
import { useAuth, useModal, useTheme } from '../../../Context';

import './Navbar.css';
const Navbar = () => {
	const { openModal } = useModal();
	const { theme, toggleTheme } = useTheme();
	const { logoutHandler, user, isLoginModal } = useAuth();
	return (
		<nav className='navbar-mobile'>
			<div className='navbar'>
				<NavLink className='navbar-brand ' to='/'>
					<h1>Game Plex</h1>
				</NavLink>
				<input type='search' className='text-field' placeholder='Search For Games' />
				<div className='navbar-cta'>
					{user && (
						<NavLink to='/videos'>
							<VideoWithTVIcon className='header-icon' />
						</NavLink>
					)}
					<div className='flex-column' onClick={toggleTheme}>
						{theme === 'dark' ? <SunIcon className='header-icon' /> : <HalfMoonIcon className='header-icon' />}
					</div>
					{user ? (
						<div className='profile-modal-holder'>
							<div className='avatar avatar-sm not-selectable '>{user?.userInfo.name.substring(0, 1).toUpperCase()}</div>
							<div className='profile-modal not-selectable '>
								{/*//!TODO Commented for future addition of profile page  */}
								{/* <ProfileModalLink text='My Profile' navigateTo='/' /> */}
								<ProfileModalLink text='My Playlist' navigateTo='/my-playlists' />
								<ProfileModalLink text='Liked Videos' navigateTo='/my-liked' />
								<ProfileModalLink text='History' navigateTo='/my-history' />
								<ProfileModalLink text='Watch Later' navigateTo='/my-watch-later' />
								<li onClick={() => logoutHandler()}>Logout 😞</li>
							</div>
						</div>
					) : (
						<button onClick={() => openModal('AuthModal')} className='btn btn-link'>
							{isLoginModal ? 'Login' : 'Sign Up'}
						</button>
					)}
				</div>
			</div>
			<input type='search' className='text-field mobile-searchbar' placeholder='Search For Games' />
		</nav>
	);
};

export { Navbar };

const ProfileModalLink = ({ text, navigateTo }) => {
	const navigate = useNavigate();
	return (
		<>
			<li onClick={() => navigate(navigateTo)}>{text}</li>
			<hr />
		</>
	);
};
