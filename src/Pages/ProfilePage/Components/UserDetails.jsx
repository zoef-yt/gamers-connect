import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon } from '../../../Assets/AllSVG';
import { editUserProfileImage } from '../../../Firebase/FirebaseFirestore';
import { setAuthUser } from '../../../store/Auth/AuthSlice';
import { openModal } from '../../../store/Modal/ModalSlice';

const UserDetails = () => {
	const dispatch = useDispatch();
	const { authUser, followers, following } = useSelector((store) => store.auth);
	const { bio, displayName, photoURL, url } = authUser ?? { bio: '', displayName: '', photoURL: '', url: '' };
	const { allPosts } = useSelector((store) => store.allPosts);

	const changeImageHandler = async (e) => {
		const newUrl = await editUserProfileImage(authUser.uid, e.target.files[0]);
		if (newUrl) {
			dispatch(setAuthUser({ ...authUser, photoURL: newUrl }));
		}
	};

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const currentUserPost = allPosts.filter((post) => {
			return post.uid === authUser.uid;
		});
		setPosts(currentUserPost);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, authUser?.uid]);

	return (
		<div className='user-detail'>
			<label className='user-img relative' htmlFor='imageEditor'>
				<EditIcon className='profile-pic-edit-btn' />

				<input id='imageEditor' type='file' onChange={changeImageHandler} style={{ display: 'none' }} />

				<img src={photoURL} alt={displayName} />
			</label>

			<div className='user-info'>
				<div className='user-info-name'>
					<p>
						{displayName}{' '}
						<button onClick={() => dispatch(openModal('FirstComponent'))} className='edit-profile-button btn'>
							Edit profile
						</button>
					</p>
				</div>

				<div className='user-info-followers'>
					<span>Followers {followers.length}</span>
					<span>Following {following.length}</span>
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
