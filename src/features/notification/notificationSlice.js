import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notification: {
		message: '',
		type: '',
		visible: false,
		backgroundColor: '',
	},
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		loadNotification(state, action) {
			state.notification = action.payload;
		},
		toggleNotification(state, action) {
			state.notification.visible = action.payload.visible;
		},
	},
});
export const { loadNotification, toggleNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
