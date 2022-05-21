const SingleComment = ({ comment, timestamp, photoURL, displayName }) => {
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return (
		<>
			<div className='post-header'>
				<img src={photoURL} alt={displayName} />
				<p className='text-small'>{displayName} ·</p>
				<p className='text-small text-grey'>{timestamp?.toDate().toLocaleString('en-IN', dateOptions)}</p>
			</div>

			<div className='post-content'>{comment}</div>
			<hr />
		</>
	);
};
export { SingleComment };
