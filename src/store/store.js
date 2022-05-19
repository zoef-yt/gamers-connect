import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import themeReducer from './Theme/ThemeSlice';
import allUserReducer from './AllUser/AllUserSlice';
import modalReducer from './Modal/ModalSlice';
import allPostsReducer from './AllPosts/AllPosts';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		allUsers: allUserReducer,
		modal: modalReducer,
		allPosts: allPostsReducer,
	},
});
