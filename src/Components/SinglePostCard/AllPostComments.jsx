import { useEffect, useState } from 'react';
import { addCommentsToPost, allCommentsFromAPost } from '../../Firebase/FirebaseFirestore';
import { SingleComment } from './SingleComment';

const AllPostComments = ({ closeComments, commentSection, photoURL, displayName, postId, userId }) => {
	const [userComment, setUserComment] = useState('');
	const [allComments, setAllComments] = useState([]);
	const [triggerEffect, setTriggerEffect] = useState(false);
	const addComment = async () => {
		if (userComment) {
			await addCommentsToPost(postId, userId, userComment);
			setUserComment('');
			setTriggerEffect(!triggerEffect);
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
					onChange={(e) => setUserComment(e.target.value)}
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
				allComments.map((comment) => (
					<SingleComment comment={comment.comment} photoURL={photoURL} displayName={displayName} timestamp={comment.timestamp} />
				))
			) : (
				<h1>No Comments</h1>
			)}
		</div>
	);
};

export { AllPostComments };
