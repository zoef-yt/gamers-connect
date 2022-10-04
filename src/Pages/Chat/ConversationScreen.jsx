import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../Firebase/FirebaseFirestore';
import { getUserDetails } from './utils';

export const ConversationScreen = ({ chatId, photoURL, displayName, closeChat }) => {
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

	const sendMessage = async () => {
		if (userText.trim() !== '') {
			await addDoc(collection(db, `chats/${chatId}/messages`), {
				from: authUser?.uid,
				text: userText,
				timestamp: serverTimestamp(),
			});
			setUserText('');
			await setDoc(doc(collection(db, `chats`), chatId), { lastestMessageTime: serverTimestamp() }, { merge: true });
		}
	};

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
				<input
					value={userText}
					className='text-field'
					placeholder='Type something epic'
					onChange={(e) => setUserText(e.target.value)}
					autoFocus
				/>
				<button className='btn btn-primary' onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
};
