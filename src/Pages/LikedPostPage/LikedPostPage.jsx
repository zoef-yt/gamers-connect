import { SinglePostCard } from '../../Components';
import { useLikes } from '../../Context';

const LikedPostPage = () => {
	const { likes } = useLikes();
	return (
		<div className='app-content'>
			<h1 className='text-align-center'>All Liked Post</h1>
			{likes.map((post, index) => {
				const user = post.from;
				return (
					<SinglePostCard
						photoUrl={user.photoURL}
						displayName={user.displayName}
						post={post.post}
						timestamp={post.timestamp}
						isLiked={true}
						index={index}
					/>
				);
			})}
		</div>
	);
};
export { LikedPostPage };
