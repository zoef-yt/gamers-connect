import { UserDetails } from './Components/UserDetails';
import { UserPostHolder } from './Components/UserPost';
import { CreateNewPostBtn } from '../../Components/CreateNewPostBtn';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
	const { uid } = useParams();
	const [userId, setUserId] = useState(null);
	useEffect(() => {
		setUserId(uid);
	}, [uid]);
	return (
		<div className='app-content'>
			<UserDetails uid={userId} />
			<hr />
			<UserPostHolder uid={userId} />
			<CreateNewPostBtn />
		</div>
	);
};

export { ProfilePage };
