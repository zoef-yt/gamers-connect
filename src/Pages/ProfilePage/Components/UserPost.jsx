import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../../Components/SinglePostCard/SinglePostCard.jsx';
const UserPostHolder = ({ uid }) => {
	const { allPosts } = useSelector((store) => store.allPosts);
	const [currentUserPosts, setCurrentUserPosts] = useState([]);

	useEffect(() => {
		const currentUserPost = allPosts.filter((post) => {
			return post.uid === uid;
		});
		setCurrentUserPosts(currentUserPost);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, uid]);

	return (
		<div className='user-posts'>
			{currentUserPosts.length > 0 ? (
				currentUserPosts.map((post) => (
					<SinglePostCard key={post.postId} caption={post.caption} image={post.image} uid={post.uid} postId={post.postId} />
				))
			) : (
				<p>No posts</p>
			)}
		</div>
	);
};
export { UserPostHolder };
