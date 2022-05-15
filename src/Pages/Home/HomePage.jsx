import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '../../Context';
import { followUser, unfollowUser } from '../../Firebase/FirebaseFirestore';
import './HomePage.css';

const Home = () => {
	const { allUsers, setTriggerUseEffect } = useUser();
	const { authUser } = useAuth();
	const navigate = useNavigate();
	const followHandler = async (currentUserId, toFollowId) => {
		if (authUser) {
			await followUser(currentUserId, toFollowId);
			setTriggerUseEffect((prev) => !prev);
		} else {
			navigate('/auth');
		}
	};
	const unfollowingHandler = async (currentUserId, toUnfollowId) => {
		if (authUser) {
			await unfollowUser(currentUserId, toUnfollowId);
			setTriggerUseEffect((prev) => !prev);
		} else {
			navigate('/auth');
		}
	};
	return (
		<div className='app-content'>
			<div className='who-to-follow-div'>
				{allUsers.map(({ photoURL, followers, uid, displayName }) => {
					return authUser?.uid === uid ? (
						<Fragment key={uid}></Fragment>
					) : (
						<div key={uid} className='who-to-follow-card'>
							<img src={photoURL} alt={displayName} />
							<div className='user-details'>
								<p>{displayName}</p>
								<p>Followers: {followers}</p>
								<button onClick={() => unfollowingHandler(authUser?.uid, uid)} className='btn btn-primary'>
									Follow
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { Home };
