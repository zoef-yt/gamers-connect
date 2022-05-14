import { getFirestore, collection, setDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { app } from './FirebaseConfig';

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
//!TODO commented for future
// const updateUserDB = async () => {};
// const createNewPost = () => {};
// const editPost = () => {};
// const addCommentsToPost = () => {};
// const addThisPostLike = () => {};
// Getting data from firestore
// const getSpecificCollection = () => {};
// const getSpecificDocument = () => {};
// const getAllDocuments = () => {};
// const getAllCollections = () => {};

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

export { addUserToTheDB, getSpecificUser, getAllUsers };
