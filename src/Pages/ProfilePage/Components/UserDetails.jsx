import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../../../Assets/AllSVG';
import { editUserProfileImage, followUser, getCollectionsSize, unfollowUser } from '../../../Firebase/FirebaseFirestore';
import { setAuthUser } from '../../../store/Auth/AuthSlice';
import { openModal } from '../../../store/Modal/ModalSlice';
import { startChatHandler } from '../../Chat/Chat';

const UserDetails = ({ uid }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { authUser, followers: authUserFollowers, following: authUserFollowings } = useSelector((store) => store.auth);
	const { allPosts } = useSelector((store) => store.allPosts);
	const { allUsers } = useSelector((store) => store.allUsers);
	const changeImageHandler = async (e) => {
		const newUrl = await editUserProfileImage(authUser.uid, e.target.files[0]);
		if (newUrl) {
			dispatch(setAuthUser({ ...authUser, photoURL: newUrl }));
		}
	};

	const [posts, setPosts] = useState([]);
	const [currentUser, setCurrentUser] = useState({ bio: '', displayName: '', photoURL: '', url: '', followers: 0, followings: 0 });
	const [isFollowing, setIsFollowing] = useState(false);
	useEffect(() => {
		const currentUserPost = allPosts.filter((post) => {
			return post?.uid === uid;
		});

		setPosts(currentUserPost);
		if (uid && allUsers) {
			if (uid === authUser?.uid) {
				setCurrentUser((prev) => ({
					...prev,
					bio: authUser.bio,
					displayName: authUser.displayName,
					photoURL: authUser.photoURL,
					url: authUser.url,
				}));
			} else {
				const currentUser = allUsers.find((user) => user?.uid === uid);
				currentUser && setCurrentUser(currentUser);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, uid, allUsers]);

	useEffect(() => {
		if (uid) {
			setIsFollowing(authUserFollowings.findIndex((following) => following.id === uid) === -1 ? false : true);
			if (uid !== authUser?.uid) {
				getUserMetaData();
			} else if (uid === authUser?.uid) {
				setCurrentUser((prev) => ({ ...prev, followers: authUserFollowers.length, followings: authUserFollowings.length }));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid, authUserFollowings]);

	const followHandler = async (currentUserId, toFollowId) => {
		if (authUser) {
			await followUser(currentUserId, toFollowId, dispatch);
		} else {
			navigate('/auth');
		}
	};

	const unfollowingHandler = async (currentUserId, toUnfollowId) => {
		if (authUser) {
			await unfollowUser(currentUserId, toUnfollowId, dispatch);
		} else {
			navigate('/auth');
		}
	};

	const getUserMetaData = async () => {
		const followers = await getCollectionsSize(`users/${uid}/followers`);
		const followings = await getCollectionsSize(`users/${uid}/following`);
		setCurrentUser((prev) => ({ ...prev, followers, followings }));
	};
	const { bio, displayName, photoURL, url, followers, followings } = currentUser;
	return (
		<div className='user-detail'>
			<label className='user-img relative' htmlFor='imageEditor'>
				{uid === authUser?.uid && (
					<>
						<EditIcon className='profile-pic-edit-btn' />

						<input id='imageEditor' type='file' onChange={changeImageHandler} style={{ display: 'none' }} />
					</>
				)}

				<img src={photoURL} alt={displayName} />
			</label>

			<div className='user-info'>
				<div className='user-info-name'>
					<p>
						{displayName}
						{uid &&
							(uid === authUser?.uid ? (
								<button onClick={() => dispatch(openModal('FirstComponent'))} className='edit-profile-button btn'>
									Edit profile
								</button>
							) : (
								<>
									<button
										onClick={() => {
											isFollowing ? unfollowingHandler(authUser?.uid, uid) : followHandler(authUser?.uid, uid);
										}}
										className='edit-profile-button btn'
									>
										{isFollowing ? 'unfollow' : 'Follow'}
									</button>
									<button
										onClick={async () => {
											await startChatHandler(authUser?.uid, uid);
											navigate('/chat');
										}}
										className='edit-profile-button btn'
									>
										Chat
									</button>
								</>
							))}
					</p>
				</div>

				<div className='user-info-followers'>
					<span>Followers {followers}</span>
					<span>Following {followings}</span>
					<span>Posts {posts.length}</span>
				</div>

				<div className='user-info-bio'>{bio}</div>

				<a className='user-info-link' href={url} target='_blank' rel='noreferrer'>
					{url}
				</a>
			</div>
		</div>
	);
};
export { UserDetails };
