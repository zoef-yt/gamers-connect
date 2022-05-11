import { UserDetails } from './Components/UserDetails';
import { UserPost } from './Components/UserPost';

const ProfilePage = () => {
	return (
		<div className='app-content'>
			<UserDetails />
			<hr />
			<UserPost />
		</div>
	);
};

export { ProfilePage };
