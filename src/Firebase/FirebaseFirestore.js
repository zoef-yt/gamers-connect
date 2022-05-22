import { getFirestore, collection, setDoc, doc, getDoc, getDocs, deleteDoc, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { app } from './FirebaseConfig';
import { setFollowing } from '../store/Auth/AuthSlice';
import { uploadImageGetUrl } from './FirebaseStorage';

const db = getFirestore(app);

const userCollection = collection(db, 'users');
const postCollection = collection(db, 'posts');

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

const getSpecificCollection = (collectionLocation) => {
	return collection(db, collectionLocation);
};

const followUser = async (currentUserId, userToFollowId, dispatch) => {
	try {
		const currentUserFollowingCollection = getSpecificCollection(`users/${currentUserId}/following`);
		await setDoc(doc(currentUserFollowingCollection, userToFollowId), {
			id: userToFollowId,
		});

		const followingUserFollowersCollection = getSpecificCollection(`users/${userToFollowId}/followers`);
		await setDoc(doc(followingUserFollowersCollection, currentUserId), {
			id: currentUserId,
		});
		const currentUserFollowingList = await getDocs(currentUserFollowingCollection);

		const allFollowers = [];
		currentUserFollowingList.forEach((doc) => {
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
		await deleteDoc(doc(followingUserFollowersCollection, currentUserId));
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

const updateUserDB = async (updatedData) => {
	console.log(updatedData);
	try {
		await setDoc(
			doc(userCollection, updatedData.uid),
			{
				displayName: updatedData.displayName || 'User',
				bio: updatedData.bio ?? '',
				url: updatedData.url ?? '',
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};

const editUserProfileImage = async (userId, imageFile) => {
	if (imageFile) {
		try {
			const url = await uploadImageGetUrl(imageFile, `users/${userId}`);
			console.log(url);
			await setDoc(doc(userCollection, userId), { photoURL: url }, { merge: true });
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	return;
};

const createNewPost = async (userId, data, setLoading) => {
	setLoading(true);
	try {
		const tempId = new Date().getTime();
		const url = data.image && (await uploadImageGetUrl(data.image, `posts/${userId}/${tempId}`));
		const documentId = await addDoc(postCollection, {
			uid: userId,
			caption: data.caption,
			image: data.image && url,
			timestamp: serverTimestamp(),
		});
		await setDoc(
			doc(postCollection, documentId.id),
			{
				postId: documentId.id,
			},
			{ merge: true },
		);
		setLoading(false);
		return 'success';
	} catch (error) {
		console.log(error);
		setLoading(false);
		return `error ${error}`;
	}
};

const editPost = (postId, updatedCaption) => {
	try {
		const postCollection = collection(db, `posts`);
		setDoc(
			doc(postCollection, postId),
			{
				caption: updatedCaption,
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};

const addCommentsToPost = async (postId, uid, comment) => {
	try {
		const postCollection = collection(db, `posts/${postId}/comments`);
		const documentId = await addDoc(postCollection, {
			comment: comment,
			from: uid,
			timestamp: serverTimestamp(),
		});
		await setDoc(
			doc(postCollection, documentId.id),
			{
				commentId: documentId.id,
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};

const allCommentsFromAPost = async (postId) => {
	try {
		const postCollection = query(collection(db, `posts/${postId}/comments`), orderBy('timestamp', 'desc'));
		const allComments = await getDocs(postCollection);
		const allCommentsData = [];
		allComments.forEach((doc) => {
			allCommentsData.push(doc.data());
		});
		return allCommentsData;
	} catch (error) {
		console.log(error);
		return [];
	}
};
const deletePost = async (postId) => {
	try {
		const postCollection = collection(db, `posts`);
		await deleteDoc(doc(postCollection, postId));
	} catch (error) {
		console.log(error);
	}
};

const likePost = async (postId, uid) => {
	try {
		const postLikesCollection = collection(db, `posts/${postId}/likes`);
		await setDoc(doc(postLikesCollection, uid), {
			uid: uid,
		});
		const userCollection = collection(db, `users/${uid}/likes`);
		await setDoc(doc(userCollection, postId), {
			postId: postId,
		});
		const posts = await getDocs(postLikesCollection);
		await setDoc(
			doc(postCollection, postId),
			{
				totalLikes: posts.size,
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};

const unLikePost = async (postId, uid) => {
	try {
		const postLikesCollection = collection(db, `posts/${postId}/likes`);
		await deleteDoc(doc(postLikesCollection, uid));
		const userCollection = collection(db, `users/${uid}/likes`);
		await deleteDoc(doc(userCollection, postId));
		const posts = await getDocs(postLikesCollection);
		await setDoc(
			doc(postCollection, postId),
			{
				totalLikes: posts.size,
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};

const bookmarkPost = async (postId, uid) => {
	try {
		const userCollection = collection(db, `users/${uid}/bookmarks`);
		await setDoc(doc(userCollection, postId), {
			postId: postId,
		});
	} catch (error) {
		console.log(error);
	}
};

const unBookmarkPost = async (postId, uid) => {
	try {
		const userCollection = collection(db, `users/${uid}/bookmarks`);
		await deleteDoc(doc(userCollection, postId));
	} catch (error) {
		console.log(error);
	}
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

const getCollectionsSize = async (path) => {
	try {
		const pathCollection = collection(db, path);
		const allDocs = await getDocs(pathCollection);
		return allDocs.size;
	} catch (error) {
		console.log(error);
		return 0;
	}
};
export {
	getSpecificCollection,
	addUserToTheDB,
	getSpecificUser,
	getAllUsers,
	followUser,
	unfollowUser,
	updateUserDB,
	editUserProfileImage,
	createNewPost,
	db,
	likePost,
	deletePost,
	addCommentsToPost,
	editPost,
	unLikePost,
	bookmarkPost,
	unBookmarkPost,
	allCommentsFromAPost,
	getCollectionsSize,
};
