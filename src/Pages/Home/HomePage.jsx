import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';
import { WhomToFollow } from './Component/WhomToFollow';
import { SinglePostCard } from '../../Components';
import { CreateNewPostBtn } from '../../Components/CreateNewPostBtn';
import { LeftChevronIcon, RightChevronIcon } from '../../Assets/AllSVG';
import { Link } from 'react-router-dom';

const Home = () => {
	const { authUser, following } = useSelector((store) => store.auth);
	const { allUsers } = useSelector((store) => store.allUsers);
	const { allPosts } = useSelector((store) => store.allPosts);
	const scrollBar = useRef(null);
	const [homePageContent, setHomePageContent] = useState([]);
	const currentUserHome = allPosts.filter((post) => following.findIndex((user) => user.id === post.uid || authUser?.uid === post.uid) !== -1);
	useEffect(() => {
		setHomePageContent(currentUserHome);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allPosts, following]);

	const [scrollHandles, setScrollHandles] = useState({
		left: false,
		right: true,
	});
	const scrollToLeft = () => {
		scrollBar.current.scrollLeft -= 300;
	};
	const scrollToRight = () => {
		scrollBar.current.scrollLeft += 300;
	};
	const scrollHandler = (e) => {
		if (e.target.scrollLeft < 20) {
			setScrollHandles((prev) => ({ ...prev, left: false }));
		} else {
			setScrollHandles((prev) => ({ ...prev, left: true }));
		}
		if (e.target.scrollLeft + e.target.clientWidth === e.target.scrollWidth) {
			setScrollHandles((prev) => ({ ...prev, right: false }));
		} else {
			setScrollHandles((prev) => ({ ...prev, right: true }));
		}
	};

	return (
		<div className='app-content'>
			<CreateNewPostBtn />
			{allUsers.length > 0 && (
				<div className='relative'>
					<div className='who-to-follow-div' ref={scrollBar} onScroll={scrollHandler}>
						{scrollHandles.left && (
							<div className='div-scroll-btn left' onClick={scrollToLeft}>
								<LeftChevronIcon />
							</div>
						)}
						{scrollHandles.right && (
							<div className='div-scroll-btn right' onClick={scrollToRight}>
								<RightChevronIcon />
							</div>
						)}

						{allUsers.map((user) => {
							return authUser?.uid === user.uid ? <Fragment key={user.uid}></Fragment> : <WhomToFollow key={user.uid} user={user} />;
						})}
					</div>
				</div>
			)}

			<div>
				{allPosts && homePageContent.length > 0 ? (
					homePageContent.map((post, index) => {
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
					})
				) : (
					<h1>
						No post to show. Go to&nbsp;
						<Link to='/explore' className='btn-link'>
							Explore Page.
						</Link>
					</h1>
				)}
			</div>
		</div>
	);
};

export { Home };
