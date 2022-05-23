import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseFirestore';

export const getUserDetails = (currentUser, allUsers) => {
	const userDetails = allUsers.find((user) => user.uid === currentUser);
	return userDetails;
};

export const startChatHandler = async (user1, user2) => {
	const chatCollection = collection(db, `chats`);
	const documents = await getDocs(chatCollection);
	let chatExists = false;
	documents.forEach((doc) => {
		if (doc.id === `${user1}-${user2}`) {
			chatExists = true;
			return;
		} else if (doc.id === `${user2}-${user1}`) {
			chatExists = true;
			return;
		}
	});

	if (!chatExists) {
		await setDoc(doc(chatCollection, `${user1}-${user2}`), { user: [user1, user2], chatId: `${user1}-${user2}` }, { merge: true });
	}
};
