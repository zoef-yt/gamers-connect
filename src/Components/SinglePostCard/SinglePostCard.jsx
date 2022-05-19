import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BookMarkedIcon, BookmarkOutlineIcon, CommentsIcon, DoneIcon, EditIcon, HeartFilledIcon, HeartOutlineIcon } from '../../Assets/AllSVG';
import { bookmarkPost, db, deletePost, editPost, likePost, unBookmarkPost, unLikePost } from '../../Firebase/FirebaseFirestore';
import { AllPostComments } from './AllPostComments';
const SinglePostCard = ({ caption, image, uid, index = 0, postId, timestamp }) => {
	const { allUsers } = useSelector((state) => state.allUsers);
	const { authUser } = useSelector((state) => state.auth);

	const [userInfo, setUserInfo] = useState({ photoURL: '', displayName: '' });
	const [commentSection, setCommentSection] = useState(false);
	const [edit, setEdit] = useState({ isEditing: false, caption: caption });
	const openComments = () => setCommentSection(true);
	const closeComments = () => setCommentSection(false);
	const getDelay = (index) => {
		const delay = 150,
			maxDelay = 700;
		return `${index * delay < maxDelay ? index * delay : maxDelay}ms`;
	};

	const { likedList } = useSelector((state) => state.auth);
	const isLiked = likedList.findIndex((post) => post.postId === postId) === -1 ? false : true;
	const handleLike = () => {
		if (isLiked) {
			unLikePost(postId, authUser.uid);
		} else {
			likePost(postId, authUser.uid);
		}
	};

	const { bookmarked } = useSelector((state) => state.auth);
	const isBookmarked = bookmarked.findIndex((post) => post.postId === postId) === -1 ? false : true;
	const handleBookmark = () => {
		if (isBookmarked) {
			unBookmarkPost(postId, authUser.uid);
		} else {
			bookmarkPost(postId, authUser.uid);
		}
	};
	useEffect(() => {
		setUserInfo(allUsers.find((user) => user.uid === uid));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const { photoURL, displayName } = userInfo;

	const handleEdit = () => {
		if (edit.isEditing) {
			caption !== edit.caption && editPost(postId, edit.caption);
			setEdit({ ...edit, isEditing: false });
		} else {
			setEdit({ isEditing: true, caption: caption });
		}
	};

	return (
		<div className={`single-user-post ${commentSection && 'single-user-post-comments-opened'}`} style={{ '--delay': getDelay(index) }}>
			{uid === authUser?.uid && (
				<div className='edit-delete-container'>
					{edit.isEditing ? <DoneIcon onClick={handleEdit} /> : <EditIcon onClick={handleEdit} />}
					<p onClick={() => deletePost(postId)}>Delete</p>
				</div>
			)}

			<div className='post-header'>
				<img src={photoURL} alt={displayName} />
				<div>
					<h4>{displayName}</h4>
					<p className='text-small text-grey'>{timestamp?.toDate().toLocaleString('en-IN', dateOptions)}</p>
				</div>
			</div>

			<div className='post-content'>
				{edit.isEditing ? (
					<input
						type='text'
						className='text-field'
						placeholder='Your caption...'
						value={edit.caption}
						onChange={(e) => {
							setEdit({ ...edit, caption: e.target.value });
						}}
					/>
				) : (
					edit.caption
				)}
			</div>
			{image && (
				<div className='post-image'>
					<img src={image} alt={caption} />
				</div>
			)}
			<div className='post-cta'>
				<div className='cta-button ' onClick={handleLike}>
					<LikeButtonComponent isLiked={isLiked} postId={postId} />
				</div>
				<div onClick={openComments} className='cta-button'>
					<CommentsIcon />
					<p>Comments</p>
				</div>
				<div className='cta-button' onClick={handleBookmark}>
					{isBookmarked ? <BookMarkedIcon /> : <BookmarkOutlineIcon />}
					<p>Bookmark</p>
				</div>
			</div>

			<AllPostComments
				closeComments={closeComments}
				commentSection={commentSection}
				photoURL={photoURL}
				displayName={displayName}
				postId={postId}
				userId={authUser?.uid}
			/>
		</div>
	);
};
export { SinglePostCard };

const LikeButtonComponent = ({ isLiked, postId }) => {
	const [postLikes, setPostLikes] = useState(0);
	useEffect(() => {
		getLike();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLiked]);
	const getLike = async () => {
		const postLikesCollection = collection(db, `posts/${postId}/likes`);
		const posts = await getDocs(postLikesCollection);
		setPostLikes(posts.size);
	};
	return (
		<>
			{isLiked ? <HeartFilledIcon style={{ fill: 'red', color: 'red' }} /> : <HeartOutlineIcon />}
			{postLikes}
			<p>Likes</p>
		</>
	);
};
