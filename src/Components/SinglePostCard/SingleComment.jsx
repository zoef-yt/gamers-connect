const SingleComment = ({ comments }) => {
	const { photoURL, displayName, comment, timestamp } = comments;
	return (
		<>
			<div className='post-header'>
				<img src={photoURL} alt={displayName} />
				<p className='text-small'>{displayName} ·</p>
				<p className='text-small text-grey'>{timestamp}</p>
			</div>

			<div className='post-content'>{comment}</div>
			<hr />
		</>
	);
};
export { SingleComment };
