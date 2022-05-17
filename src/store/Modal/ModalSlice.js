import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpened: false,
	modalType: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isModalOpened = false;
			state.modalType = action.payload;
			state.isModalOpened = true;
		},
		closeModal: (state) => {
			state.isModalOpened = false;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
