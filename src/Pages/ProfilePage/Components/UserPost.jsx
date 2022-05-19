import { SinglePostCard } from '../../../Components';
import { useUser } from '../../../Context';

const UserPost = () => {
	const { userPosts } = useUser();
	return (
		<div className='user-posts'>
			{userPosts.map((post, index) => {
				const user = post.from;
				return (
					<SinglePostCard
						photoUrl={user.photoURL}
						displayName={user.displayName}
						post={post.post}
						timestamp={post.timestamp}
						index={index}
					/>
				);
			})}
		</div>
	);
};
export { UserPost };
