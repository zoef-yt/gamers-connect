import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../Components';

const LikedPostPage = () => {
	const { likedList } = useSelector((store) => store.auth);
	const { allPosts } = useSelector((store) => store.allPosts);
	const likedListPosts = allPosts.filter((post) => likedList.findIndex((likedPost) => likedPost.postId === post.postId) !== -1);
	return (
		<div className='app-content'>
			<h1 className='text-align-center'>All Liked Post</h1>
			{likedListPosts.map((post, index) => {
				return (
					<SinglePostCard
						key={post.postId}
						caption={post.caption}
						image={post.image}
						uid={post.uid}
						postId={post.postId}
						timestamp={post.timestamp}
						index={index}
					/>
				);
			})}
		</div>
	);
};
export { LikedPostPage };
