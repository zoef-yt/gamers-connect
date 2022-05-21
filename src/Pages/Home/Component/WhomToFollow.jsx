import { useNavigate } from 'react-router-dom';
import { followUser, unfollowUser } from '../../../Firebase/FirebaseFirestore';
import { useDispatch, useSelector } from 'react-redux';

export const WhomToFollow = (props) => {
	const { photoURL, uid, displayName } = props.user;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { authUser, following: followingList } = useSelector((store) => store.auth);
	const isFollowing = followingList.findIndex((follower) => follower.id === uid) === -1 ? false : true;

	const followHandler = async (e, currentUserId, toFollowId) => {
		e.stopPropagation();
		if (authUser) {
			await followUser(currentUserId, toFollowId, dispatch);
		} else {
			navigate('/auth');
		}
	};

	const unfollowingHandler = async (e, currentUserId, toUnfollowId) => {
		e.stopPropagation();
		if (authUser) {
			await unfollowUser(currentUserId, toUnfollowId, dispatch);
		} else {
			navigate('/auth');
		}
	};

	return (
		<div className='who-to-follow-card' onClick={() => navigate(`/profile/${uid}`)}>
			<img src={photoURL} alt={displayName} />
			<div className='user-details'>
				<p>{displayName}</p>

				<button
					onClick={(e) => (!isFollowing ? followHandler(e, authUser?.uid, uid) : unfollowingHandler(e, authUser?.uid, uid))}
					className={`btn ${!isFollowing ? 'btn-primary' : 'btn-secondary'}`}
				>
					{!isFollowing ? 'Follow' : 'Unfollow'}
				</button>
			</div>
		</div>
	);
};
