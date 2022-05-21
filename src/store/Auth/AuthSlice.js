import { createSlice } from '@reduxjs/toolkit';
import { updateUserDB } from '../../Firebase/FirebaseFirestore';

const initialState = {
	authUser: null,
	isLoginForm: false,
	isLoading: false,
	error: {
		hasError: false,
		errorMessage: '',
	},
	followers: [],
	following: [],
	posts: [],
	likedList: [],
	bookmarked: [],
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateUserDetails: (state, action) => {
			updateUserDB(action.payload);
			state.authUser = { ...state.authUser, ...action.payload };
		},
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
		setFollower: (state, action) => {
			state.followers = action.payload;
		},
		setFollowing: (state, action) => {
			state.following = action.payload;
		},
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setLikeList: (state, action) => {
			state.likedList = action.payload;
		},
		setBookmarked: (state, action) => {
			state.bookmarked = action.payload;
		},
		setInitialState: (state) => {
			state.authUser = null;
			state.followers = [];
			state.following = [];
			state.posts = [];
			state.likedList = [];
			state.bookmarked = [];
		},
	},
});

export const {
	setAuthUser,
	setIsLoginForm,
	setIsLoading,
	setError,
	setFollower,
	setFollowing,
	setPosts,
	updateUserDetails,
	setLikeList,
	setBookmarked,
	setInitialState,
} = authSlice.actions;
export default authSlice.reducer;
