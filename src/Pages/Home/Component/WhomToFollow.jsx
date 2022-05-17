import { useNavigate } from 'react-router-dom';
import { followUser, getAllUsers, unfollowUser } from '../../../Firebase/FirebaseFirestore';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUser } from '../../../store/AllUser/AllUserSlice';

export const WhomToFollow = (props) => {
	const { photoURL, followers, uid, displayName } = props.user;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { authUser, following: followingList } = useSelector((store) => store.auth);
	const isFollowing = followingList.findIndex((follower) => follower.id === uid) === -1 ? false : true;

	const getAllUserHandler = async () => {
		const users = await getAllUsers();
		dispatch(setAllUser(users));
	};
	const followHandler = async (currentUserId, toFollowId) => {
		if (authUser) {
			await followUser(currentUserId, toFollowId, dispatch);
			getAllUserHandler();
		} else {
			navigate('/auth');
		}
	};

	const unfollowingHandler = async (currentUserId, toUnfollowId) => {
		if (authUser) {
			await unfollowUser(currentUserId, toUnfollowId, dispatch);
			getAllUserHandler();
		} else {
			navigate('/auth');
		}
	};

	return (
		<div className='who-to-follow-card'>
			<img src={photoURL} alt={displayName} />
			<div className='user-details'>
				<p>{displayName}</p>
				<p>Followers: {followers}</p>
				<button
					onClick={() => (!isFollowing ? followHandler(authUser?.uid, uid) : unfollowingHandler(authUser?.uid, uid))}
					className={`btn ${!isFollowing ? 'btn-primary' : 'btn-secondary'}`}
				>
					{!isFollowing ? 'Follow' : 'Unfollow'}
				</button>
			</div>
		</div>
	);
};
