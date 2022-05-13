import { SingleComment } from './SingleComment';

const AllPostComments = ({ closeComments, commentSection, photoURL, displayName, timestamp }) => {
	return (
		<div className={` user-post-comments-container ${commentSection ? '' : 'user-post-comments-container-closed'}`}>
			<div onClick={closeComments} className={' comment-close-btn menu-burger menu-burger-opened'}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			{Array(20)
				.fill({ photoURL, displayName, comment: 'this is  comment', timestamp })
				.map((comment) => (
					<SingleComment comments={comment} />
				))}
		</div>
	);
};

export { AllPostComments };
