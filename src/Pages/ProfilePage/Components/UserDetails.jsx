import { useUser } from '../../../Context';

const UserDetails = () => {
	const { user } = useUser();

	const { bio, displayName, followers, following, photoUrl, totalPost, link } = user;
	return (
		<div className='user-detail'>
			<div className='user-img'>
				<img src={photoUrl} alt={displayName} />
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
					<span>Posts {totalPost}</span>
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
