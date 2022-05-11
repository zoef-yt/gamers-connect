import { createContext, useContext, useEffect, useState } from 'react';

const LikedContext = createContext();

const LikedProvider = ({ children }) => {
	const [likes, setLikes] = useState([]);
	useEffect(() => {
		//!TODO this is a temp data and will  be removed

		setLikes([
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
	return <LikedContext.Provider value={{ likes }}>{children}</LikedContext.Provider>;
};

const useLikes = () => useContext(LikedContext);

export { useLikes, LikedProvider };
