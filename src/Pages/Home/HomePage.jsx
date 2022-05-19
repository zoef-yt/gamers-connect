import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';
import { WhomToFollow } from './Component/WhomToFollow';

const Home = () => {
	const { authUser } = useSelector((store) => store.auth);
	const { allUsers } = useSelector((store) => store.allUsers);
	return (
		<div className='app-content'>
			<div className='who-to-follow-div'>
				{allUsers &&
					allUsers.map((user) => {
						return authUser?.uid === user.uid ? <Fragment key={user.uid}></Fragment> : <WhomToFollow key={user.uid} user={user} />;
					})}
			</div>
		</div>
	);
};

export { Home };
