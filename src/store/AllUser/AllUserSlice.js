import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	allUsers: [],
};

const allUserSlice = createSlice({
	name: 'allUser',
	initialState,
	reducers: {
		setAllUser: (state, action) => {
			console.log(action.payload);
			state.allUsers = action.payload;
		},
	},
});

export const { setAllUser } = allUserSlice.actions;
export default allUserSlice.reducer;
