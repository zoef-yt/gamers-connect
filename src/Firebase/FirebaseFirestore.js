import { getFirestore, collection, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { app } from './FirebaseConfig';
import { setFollowing } from '../store/Auth/AuthSlice';

const db = getFirestore(app);

const userCollection = collection(db, 'users');
// const postCollection = collection(db, 'posts');

// Adding data to firestore
const addUserToTheDB = async (yourDocumentId, data) => {
	try {
		await setDoc(doc(userCollection, yourDocumentId), {
			...data,
		});
	} catch (error) {
		console.log(error);
	}
};

const followUser = async (currentUserId, followingUserId, dispatch) => {
	try {
		const currentUserFollowingCollection = getSpecificCollection(`users/${currentUserId}/following`);
		await setDoc(doc(currentUserFollowingCollection, followingUserId), {
			id: followingUserId,
		});
		const follows = await getDocs(currentUserFollowingCollection);
		await setDoc(doc(userCollection, currentUserId), { following: follows.size }, { merge: true });

		const followingUserFollowersCollection = getSpecificCollection(`users/${followingUserId}/followers`);
		await setDoc(doc(followingUserFollowersCollection, currentUserId), {
			id: currentUserId,
		});
		const followers = await getDocs(followingUserFollowersCollection);
		await setDoc(doc(userCollection, followingUserId), { followers: followers.size }, { merge: true });
		const currentUserFollowers = await getDocs(currentUserFollowingCollection);

		const allFollowers = [];
		currentUserFollowers.forEach((doc) => {
			allFollowers.push(doc.data());
		});
		dispatch(setFollowing(allFollowers));
	} catch (error) {
		console.log(error);
	}
};

const unfollowUser = async (currentUserId, unfollowingUserId, dispatch) => {
	try {
		const currentUserFollowingCollection = collection(db, `users/${currentUserId}/following`);
		const followingUserFollowersCollection = collection(db, `users/${unfollowingUserId}/followers`);

		await deleteDoc(doc(currentUserFollowingCollection, unfollowingUserId));
		const follows = await getDocs(currentUserFollowingCollection);
		await setDoc(doc(userCollection, currentUserId), { following: follows.size }, { merge: true });

		await deleteDoc(doc(followingUserFollowersCollection, currentUserId));
		const followers = await getDocs(followingUserFollowersCollection);
		await setDoc(doc(userCollection, unfollowingUserId), { followers: followers.size }, { merge: true });

		const currentUserFollowers = await getDocs(currentUserFollowingCollection);
		const allFollowers = [];
		currentUserFollowers.forEach((doc) => {
			allFollowers.push(doc.data());
		});
		dispatch(setFollowing(allFollowers));
	} catch (error) {
		console.log('un-follow not done', error);
	}
};
//! TODO commented for future
// const updateUserDB = async () => {};
// const createNewPost = () => {};
// const editPost = () => {};
// const addCommentsToPost = () => {};
// const addThisPostLike = () => {};
// Getting data from firestore
// const getSpecificDocument = () => {};
// const getAllDocuments = () => {};
// const getAllCollections = () => {};

const getSpecificCollection = (collectionLocation) => {
	return collection(db, collectionLocation);
};

const getSpecificUser = async (userId) => {
	try {
		const docRef = doc(db, `users`, userId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getAllUsers = async () => {
	try {
		const docs = await getDocs(collection(db, 'users'));
		const allUsersArray = [];
		docs.forEach((doc) => {
			allUsersArray.push(doc.data());
		});
		return allUsersArray;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export { addUserToTheDB, getSpecificUser, getAllUsers, followUser, unfollowUser };
