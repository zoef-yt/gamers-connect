import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import themeReducer from './Theme/ThemeSlice';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
	},
});
