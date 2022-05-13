import { useState } from 'react';
import { BookMarkedIcon, BookmarkOutlineIcon, CommentsIcon, HeartFilledIcon, HeartOutlineIcon } from '../../Assets/AllSVG';
import { AllPostComments } from './AllPostComments';

const SinglePostCard = ({ photoUrl, displayName, post, timestamp, isBookMarked = false, isLiked = false }) => {
	const [commentSection, setCommentSection] = useState(false);
	const openComments = () => setCommentSection(true);
	const closeComments = () => setCommentSection(false);

	return (
		<div className={`single-user-post ${commentSection && 'single-user-post-comments-opened'}`}>
			{!isBookMarked ? <BookmarkOutlineIcon className='bookmark-icon' /> : <BookMarkedIcon className='bookmarked-icon' />}

			<div className='post-header'>
				<img src={photoUrl} alt={displayName} />
				<p className='text-small'>{displayName} ·</p>
				<p className='text-small text-grey'>{timestamp.split(' ').slice(0, 3).join(' ')}</p>
			</div>

			<div className='post-content'>{post}</div>

			<div className='post-cta'>
				<div className='cta-button'>
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
export { SinglePostCard };
