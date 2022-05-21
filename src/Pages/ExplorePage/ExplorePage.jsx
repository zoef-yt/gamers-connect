import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../Components';
import '../Home/HomePage.css';

export const ExplorePage = () => {
	const { allPosts } = useSelector((store) => store.allPosts);

	return (
		<div className='app-content'>
			<div>
				<h1 className='text-align-center'>Explore Page</h1>
				<div>
					{allPosts &&
						allPosts.map((post) => {
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
						})}
				</div>
			</div>
		</div>
	);
};
