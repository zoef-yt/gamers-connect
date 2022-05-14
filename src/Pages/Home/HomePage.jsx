import { useAuth, useUser } from '../../Context';
import './HomePage.css';

const Home = () => {
	const { allUsers } = useUser();
	const { authUser } = useAuth();
	return (
		<div className='app-content'>
			<div className='who-to-follow-div'>
				{allUsers.map(({ photoURL, followers, uid, displayName }) => {
					return authUser.uid === uid ? (
						<></>
					) : (
						<div key={uid} className='who-to-follow-card'>
							<img src={photoURL} alt={displayName} />
							<div className='user-details'>
								<p>{displayName}</p>
								<p>Followers: {followers}</p>
								<button className='btn btn-primary'>Follow</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { Home };
