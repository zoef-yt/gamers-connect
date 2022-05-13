import { SinglePostCard } from '../../Components';
import { useBookmark } from '../../Context';

const BookmarkPage = () => {
	const { bookmarks } = useBookmark();
	return (
		<div className='app-content'>
			<h1 className='text-align-center'>All Bookmarks</h1>

			{bookmarks.map((post) => {
				const user = post.from;
				return (
					<SinglePostCard
						photoUrl={user.photoURL}
						displayName={user.displayName}
						post={post.post}
						timestamp={post.timestamp}
						isBookMarked={true}
					/>
				);
			})}
		</div>
	);
};

export { BookmarkPage };
