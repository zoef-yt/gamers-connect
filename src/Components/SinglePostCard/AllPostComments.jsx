import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCommentsToPost, allCommentsFromAPost } from '../../Firebase/FirebaseFirestore';
import { SingleComment } from './SingleComment';

const AllPostComments = ({ closeComments, commentSection, photoURL, displayName, postId, userId }) => {
	const [userComment, setUserComment] = useState('');
	const [allComments, setAllComments] = useState([]);
	const [triggerEffect, setTriggerEffect] = useState(false);
	const { authUser } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const addComment = async () => {
		if (authUser) {
			if (userComment.trim() !== '') {
				if (userComment) {
					await addCommentsToPost(postId, userId, userComment);
					setUserComment('');
					setTriggerEffect(!triggerEffect);
				}
			}
		} else {
			navigate('/auth');
		}
	};
	useEffect(() => {
		getComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerEffect]);

	const getComments = async () => {
		const comments = await allCommentsFromAPost(postId);
		setAllComments(comments);
	};

	return (
		<div className={`user-post-comments-container ${commentSection ? '' : 'user-post-comments-container-closed'}`}>
			<div className='flex-row all-comments-header'>
				<input
					type='text'
					placeholder='Add a comment...'
					className='text-field add-comment-text-field'
					value={userComment}
					onChange={(e) => (authUser ? setUserComment(e.target.value) : navigate('/auth'))}
				/>

				{userComment === '' ? (
					<button onClick={closeComments} className='btn btn-primary'>
						Close
					</button>
				) : (
					<button onClick={addComment} className='btn btn-primary'>
						Send
					</button>
				)}
			</div>

			{allComments.length > 0 ? (
				allComments.map((comment) => {
					const { comment: commentText, from, timestamp } = comment;
					return <SingleComment comment={commentText} uid={from} timestamp={timestamp} />;
				})
			) : (
				<h1>No Comments</h1>
			)}
		</div>
	);
};

export { AllPostComments };
