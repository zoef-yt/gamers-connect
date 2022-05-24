import { getSpecificUser, db } from './FirebaseFirestore';
import { auth } from './FirebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { setAuthUser, setBookmarked, setFollower, setFollowing, setInitialState, setLikeList, setPosts } from '../store/Auth/AuthSlice';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { setAllUser } from '../store/AllUser/AllUserSlice';
import { setAllPosts } from '../store/AllPosts/AllPosts';

const startListeners = (dispatch) => {
	authChangeListener(dispatch);
	usersListener(dispatch);
	postsListener(dispatch);
	// chatListener(dispatch);
};

const authChangeListener = (dispatch) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const authenticatedUser = await getSpecificUser(user.uid);
			dispatch(setAuthUser(authenticatedUser));
			if (!authenticatedUser)
				setTimeout(async () => {
					const authenticatedUser = await getSpecificUser(user.uid);
					dispatch(setAuthUser(authenticatedUser));
				}, 1000);
		} else {
			dispatch(setInitialState());
		}
	});
};

const usersListener = (dispatch) => {
	onSnapshot(collection(db, 'users'), (snapshot) => {
		dispatch(setAllUser(snapshot.docs.map((doc) => doc.data())));
	});
};

const postsListener = (dispatch) => {
	onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
		dispatch(setAllPosts(snapshot.docs.map((doc) => doc.data())));
	});
};

const startUserDetailListener = (dispatch, userId) => {
	try {
		onSnapshot(collection(db, `users/${userId}/following`), (snapshot) => {
			dispatch(setFollowing(snapshot.docs.map((doc) => doc.data())));
		});

		onSnapshot(collection(db, `users/${userId}/followers`), (snapshot) => {
			dispatch(setFollower(snapshot.docs.map((doc) => doc.data())));
		});

		onSnapshot(collection(db, `users/${userId}/posts`), (snapshot) => {
			dispatch(setPosts(snapshot.docs.map((doc) => doc.data())));
		});

		onSnapshot(collection(db, `users/${userId}/likes`), (snapshot) => {
			dispatch(setLikeList(snapshot.docs.map((doc) => doc.data())));
		});

		onSnapshot(collection(db, `users/${userId}/bookmarks`), (snapshot) => {
			dispatch(setBookmarked(snapshot.docs.map((doc) => doc.data())));
		});
	} catch (e) {
		console.log(e);
	}
};

export { startListeners, startUserDetailListener };
