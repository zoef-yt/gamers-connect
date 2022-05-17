import { useDispatch, useSelector } from 'react-redux';
import { EditIcon } from '../../../Assets/AllSVG';
import { editUserProfileImage } from '../../../Firebase/FirebaseFirestore';
import { setAuthUser } from '../../../store/Auth/AuthSlice';
import { openModal } from '../../../store/Modal/ModalSlice';
const UserDetails = () => {
	const dispatch = useDispatch();
	const { authUser, followers, following, posts } = useSelector((store) => store.auth);
	const { bio, displayName, photoURL, url } = authUser;

	const changeImageHandler = async (e) => {
		const newUrl = await editUserProfileImage(authUser.uid, e.target.files[0]);
		if (newUrl) {
			dispatch(setAuthUser({ ...authUser, photoURL: newUrl }));
		}
	};
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
