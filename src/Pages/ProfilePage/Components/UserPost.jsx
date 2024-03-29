import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../../Components/SinglePostCard/SinglePostCard.jsx';
const UserPostHolder = ({ uid }) => {
	const { allPosts } = useSelector((store) => store.allPosts);
	const [currentUserPosts, setCurrentUserPosts] = useState([]);
	useEffect(() => {
		const userPosts = allPosts.filter((post) => {
			return post.uid === uid;
		});
		setCurrentUserPosts((prev) => (prev = userPosts));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, uid]);

	return (
		<div className='user-posts'>
			{currentUserPosts.length > 0 ? (
				currentUserPosts.map((post, index) => {
					return (
						<SinglePostCard
							key={post.postId}
							index={index}
							caption={post.caption}
							image={post.image}
							uid={post.uid}
							postId={post.postId}
							postLikes={post.totalLikes ?? 0}
						/>
					);
				})
			) : (
				<h1>No post from this user</h1>
			)}
		</div>
	);
};
export { UserPostHolder };
