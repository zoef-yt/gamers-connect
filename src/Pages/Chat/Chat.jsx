import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../Firebase/FirebaseFirestore';
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

const ConversationScreen = ({ chatId, photoURL, displayName, closeChat }) => {
	const { authUser } = useSelector((state) => state.auth);
	const { allUsers } = useSelector((state) => state.allUsers);
	const scrollBar = useRef(null);
	useEffect(() => {
		const unSub = onSnapshot(query(collection(db, `chats/${chatId}/messages`), orderBy('timestamp', 'asc')), (snapshot) => {
			setMessages(snapshot.docs.map((doc) => doc.data()));
			setTimeout(() => {
				scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
			}, 0);
		});
		return () => {
			unSub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [messages, setMessages] = useState([]);
	const [userText, setUserText] = useState('');

	return (
		<div className='conversation-screen'>
			<div className='conversation-screen-header'>
				<img src={photoURL} alt={displayName} class='avatar avatar-sm' />
				<p>{displayName}</p>
				<button className='btn btn-primary margin-left' onClick={closeChat}>
					close
				</button>
			</div>
			<div className='conversation-screen-body' ref={scrollBar}>
				{messages.map((message) => {
					const { text, from, timestamp } = message;
					const userDetails = getUserDetails(from, allUsers);
					const { displayName, photoURL, uid } = userDetails;
					const isMe = uid === authUser?.uid;
					return (
						<div className={`single-conversation-tile ${isMe ? 'isMe' : ''}`}>
							<img src={photoURL} alt={displayName} class='avatar avatar-sm' />

							<div className='conversation-bubble'>
								{text}
								<p className='text-grey text-small'>
									{timestamp?.toDate().toLocaleString('en-IN', {
										timeStyle: 'short',
										dateStyle: 'medium',
									})}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className='send-message-container'>
				<input value={userText} className='text-field' placeholder='Type something epic' onChange={(e) => setUserText(e.target.value)} />
				<button
					className='btn btn-primary'
					onClick={async () => {
						if (userText.trim() !== '') {
							await addDoc(collection(db, `chats/${chatId}/messages`), {
								from: authUser?.uid,
								text: userText,
								timestamp: serverTimestamp(),
							});
							setUserText('');
						}
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
};

const getUserDetails = (currentUser, allUsers) => {
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
