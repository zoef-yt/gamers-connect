import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './comments.css';
const SingleComment = ({ comment, timestamp, uid }) => {
	const dateOptions = {
		timeStyle: 'short',
		dateStyle: 'medium',
	};
	const { allUsers } = useSelector((state) => state.allUsers);
	const user = allUsers.find((user) => user.uid === uid);
	const { photoURL, displayName } = user;
	const navigate = useNavigate();
	return (
		<div className='single-comment'>
			<div className='post-header' onClick={() => navigate(`/profile/${uid}`)}>
				<img src={photoURL} alt={displayName} />
				<p>{displayName}</p>
				<p className='text-small text-grey'>{timestamp?.toDate().toLocaleString('en-IN', dateOptions)}</p>
			</div>

			<div className='post-content'>{comment}</div>
		</div>
	);
};
export { SingleComment };
