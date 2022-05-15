import { useSelector } from 'react-redux';

const UserDetails = () => {
	const { authUser } = useSelector((store) => store.auth);

	const { bio, displayName, followers, following, photoURL, posts, link } = authUser;
	return (
		<div className='user-detail'>
			<div className='user-img'>
				<img src={photoURL} alt={displayName} />
			</div>
			<div className='user-info'>
				<div className='user-info-name'>
					<p>
						{displayName} <span className='edit-profile-button'>Edit profile</span>
					</p>
				</div>
				<div className='user-info-followers'>
					<span>Followers {followers}</span>
					<span>Following {following}</span>
					<span>Posts {posts}</span>
				</div>
				<div className='user-info-bio'>{bio}</div>
				<a className='user-info-link' href={link} target='_blank' rel='noreferrer'>
					{link}
				</a>
			</div>
		</div>
	);
};
export { UserDetails };
