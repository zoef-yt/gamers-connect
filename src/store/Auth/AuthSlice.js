import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	authUser: null,
	isLoginForm: false,
	isLoading: false,
	error: {
		hasError: false,
		errorMessage: '',
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUser: (state, action) => {
			state.authUser = action.payload;
		},
		setIsLoginForm: (state) => {
			state.isLoginForm = !state.isLoginForm;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setAuthUser, setIsLoginForm, setIsLoading, setError } = authSlice.actions;

export default authSlice.reducer;
