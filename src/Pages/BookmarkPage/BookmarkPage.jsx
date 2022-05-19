import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../Components';

const BookmarkPage = () => {
	const { bookmarked } = useSelector((store) => store.auth);
	const { allPosts } = useSelector((store) => store.allPosts);
	const bookmarkList = allPosts.filter((post) => bookmarked.findIndex((bookmarkedPost) => bookmarkedPost.postId === post.postId) !== -1);
	return (
		<div className='app-content'>
			<h1 className='text-align-center'>All Bookmarks</h1>

			{bookmarkList.length > 0 ? (
				bookmarkList.map((post) => {
					return (
						<SinglePostCard
							key={post.postId}
							caption={post.caption}
							image={post.image}
							uid={post.uid}
							postId={post.postId}
							timestamp={post.timestamp}
						/>
					);
				})
			) : (
				<h1 className='text-align-center'>No Bookmarks</h1>
			)}
		</div>
	);
};

export { BookmarkPage };
