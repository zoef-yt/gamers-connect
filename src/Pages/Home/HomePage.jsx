import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';
import { WhomToFollow } from './Component/WhomToFollow';
import { SinglePostCard } from '../../Components';
import { CreateNewPostBtn } from '../../Components/CreateNewPostBtn';

const Home = () => {
	const { authUser, following } = useSelector((store) => store.auth);
	const { allUsers } = useSelector((store) => store.allUsers);
	const { allPosts } = useSelector((store) => store.allPosts);
	const [homePageContent, setHomePageContent] = useState([]);
	const currentUserHome = allPosts.filter((post) => following.findIndex((user) => user.id === post.uid) !== -1);
	useEffect(() => {
		setHomePageContent(currentUserHome);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, following]);

	return (
		<div className='app-content'>
			<CreateNewPostBtn />
			<div className='who-to-follow-div'>
				{allUsers &&
					allUsers.map((user) => {
						return authUser?.uid === user.uid ? <Fragment key={user.uid}></Fragment> : <WhomToFollow key={user.uid} user={user} />;
					})}
			</div>
			<div>
				{allPosts && homePageContent.length > 0 ? (
					homePageContent.map((post) => {
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
					<h1>No post from users you are following</h1>
				)}
			</div>
		</div>
	);
};

export { Home };
