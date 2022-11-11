import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pathname: '',
};

const createPageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		addPagePath(state, action) {
			state.pathname = action.payload;
		},
	},
});

export const { addPagePath } = createPageSlice.actions;

export default createPageSlice.reducer;
