import { useState } from 'react';
import { CommentsIcon, HeartFilledIcon, HeartOutlineIcon } from '../../Assets/AllSVG';
import { useUser } from '../../Context';
import { UserDetails } from './Components/UserDetails';
import './ProfilePage.css';

const ProfilePage = () => {
	return (
		<div className='app-content'>
			<UserDetails />
			<hr />
			<UserPost />
		</div>
	);
};

export { ProfilePage };
const UserPost = () => {
	const { userPosts } = useUser();
	return (
		<div className='user-posts'>
			{userPosts.map((post) => {
				const user = post.from;
				return <SinglePost photoUrl={user.photoURL} displayName={user.displayName} post={post.post} timestamp={post.timestamp} />;
			})}
		</div>
	);
};

const SinglePost = ({ photoUrl, displayName, post, timestamp }) => {
	const [commentSection, setCommentSection] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const openComments = () => setCommentSection(true);
	const closeComments = () => setCommentSection(false);

	return (
		<div className={`single-user-post ${commentSection && 'single-user-post-comments-opened'}`}>
			<div className='post-header'>
				<img src={photoUrl} alt={displayName} />
				<p className='text-small'>{displayName} ·</p>
				<p className='text-small text-grey'>{timestamp.split(' ').slice(0, 3).join(' ')}</p>
			</div>

			<div className='post-content'>{post}</div>

			<div className='post-cta'>
				<div onClick={() => setIsLiked(!isLiked)} className='cta-button'>
					{!isLiked ? <HeartOutlineIcon /> : <HeartFilledIcon style={{ fill: 'red', color: 'red' }} />}
					<p>60 likes</p>
				</div>
				<div onClick={openComments} className='cta-button'>
					<CommentsIcon />
					<p>10 comments</p>
				</div>
			</div>
			<AllPostComments
				closeComments={closeComments}
				commentSection={commentSection}
				photoURL={photoUrl}
				displayName={displayName}
				post={post}
				timestamp={timestamp}
			/>
		</div>
	);
};

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
