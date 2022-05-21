import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SinglePostCard } from '../../Components';
import '../Home/HomePage.css';
import './ExplorePage.css';

export const ExplorePage = () => {
	const { allPosts } = useSelector((store) => store.allPosts);
	const filterBy = ['New', 'Old', 'Trending'];
	const [selectedFilter, setSelectedFilter] = useState(filterBy[0]);
	const optionsHandler = (e) => {
		setSelectedFilter(e.target.value);
	};
	const getSortedData = (data) => {
		if (allPosts) {
			if (selectedFilter === 'New') {
				return allPosts;
			}
			if (selectedFilter === 'Old') {
				return [...data].reverse();
			}
			if (selectedFilter === 'Trending') {
				return [...data].sort((a, b) => b.totalLikes - a.totalLikes);
			}
		}
	};
	return (
		<div className='app-content'>
			<div>
				<h1 className='text-align-center'>Explore Page</h1>

				<div className='flex-column '>
					<select value={selectedFilter} className='select-filterBy' onChange={optionsHandler}>
						{filterBy.map((tag) => (
							<option key={tag} value={tag}>
								{tag}
							</option>
						))}
					</select>
				</div>

				<div>
					{allPosts &&
						getSortedData(allPosts).map((post, index) => {
							return (
								<SinglePostCard
									key={post.postId}
									caption={post.caption}
									image={post.image}
									uid={post.uid}
									postId={post.postId}
									index={index}
									timestamp={post.timestamp}
									postLikes={post.totalLikes ?? 0}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};
