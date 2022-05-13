import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const [userPosts, setUserPost] = useState([]);

	useEffect(() => {
		setUser({
			displayName: 'Zoef Shaikh',
			photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
			uid: '114341657720563756915',
			bio: "When i first saw you i said Mashallah and ever since I've been saying Inshallah.",
			followers: 166,
			following: 640,
			totalPost: 4,
			link: 'https://twitter.com/zoef_yt',
		});

		setUserPost([
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
			{
				from: {
					displayName: 'zoef Shaikh',
					email: 'shaikhzoef36@gmail.com',
					phoneNumber: null,
					photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gip9pNaEOBAyDRlCI5WL8Phn2D1A3t-6Julb8RmG3Q=s96-c',
					providerId: 'google.com',
					uid: '114341657720563756915',
				},
				post: 'This is a post message and will be removed later',
				timestamp: '8 May 2022 at 13:12:35 UTC+5:30',
			},
		]);
	}, []);
	return <UserContext.Provider value={{ user, userPosts }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
