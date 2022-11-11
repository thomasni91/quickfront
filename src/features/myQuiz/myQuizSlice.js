import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uploadedShowMore: false,
	savedShowMore: false,
};

export const myQuizSlice = createSlice({
	name: 'myQuiz',
	initialState,
	reducers: {
		setUploadedShowMore(state) {
			state.uploadedShowMore = !state.uploadedShowMore;
		},
		setSavedShowMore(state) {
			state.savedShowMore = !state.savedShowMore;
		},
	},
});

export const { setUploadedShowMore, setSavedShowMore } = myQuizSlice.actions;
export default myQuizSlice.reducer;
