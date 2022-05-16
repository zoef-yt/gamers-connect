import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: localStorage.getItem('theme') ?? 'dark',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state) => {
			document.documentElement.setAttribute('data-theme', state.theme === 'light' ? 'dark' : 'light');
			localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light');
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
