import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../Firebase/FirebaseFirestore';
import { ConversationScreen } from './ConversationScreen';
import { getUserDetails } from './utils';
import './Chat.css';
export const ChatPage = () => {
	const { authUser } = useSelector((state) => state.auth);
	const { allUsers } = useSelector((state) => state.allUsers);
	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);

	const closeChat = () => {
		setSelectedChat(null);
	};
	useEffect(() => {
		let unSub;
		if (authUser) {
			unSub = onSnapshot(query(collection(db, `chats`), where('user', 'array-contains', authUser?.uid)), (snapshot) => {
				setChats(snapshot.docs.map((doc) => doc.data()));
			});
		}
		return () => {
			unSub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	return (
		<div className='app-content'>
			<h1>All Chats</h1>
			<div className='chat-screen'>
				{chats.map((message) => {
					const userDetails = getUserDetails(message.user[1] === authUser?.uid ? message.user[0] : message.user[1], allUsers);
					const { displayName, photoURL } = userDetails;
					return (
						<>
							<div className='single-chat-tile' onClick={() => setSelectedChat({ chatId: message.chatId, photoURL, displayName })}>
								<img src={photoURL} alt={displayName} class='avatar avatar-md' />
								<p>{displayName}</p>
							</div>
						</>
					);
				})}
				{selectedChat && (
					<ConversationScreen
						chatId={selectedChat.chatId}
						photoURL={selectedChat.photoURL}
						displayName={selectedChat.displayName}
						closeChat={closeChat}
					/>
				)}
			</div>
		</div>
	);
};
