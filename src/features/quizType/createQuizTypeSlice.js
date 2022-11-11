import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { QUIZ_TYPE_API } from '../../api/endPoints';
import { loadNotification } from '../notification/notificationSlice';
import { getPopularTypeApi, getQuizTypeApi } from '../../api/quizTypeApi';

const initialState = {
	quizType: [],
	error: false,
	loading: false,
	savedQuizType: [],
	popularType: [],
};

export const fetchQuizType = createAsyncThunk(
	'quizType/fetchQuizType',
	async () => {
		const response = await getQuizTypeApi();
		return response.data;
	},
);

export const addNewQuizType = createAsyncThunk(
	'quizType/addQuizType',
	async (data, thunkAPI) => {
		const { newQuizType, token } = data;
		const response = await axios.post(
			`${QUIZ_TYPE_API}`,
			{ name: newQuizType },
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		thunkAPI.dispatch(
			loadNotification({
				message: 'successfully add a new quiz type',
				type: 'success',
				visible: true,
			}),
		);
		return response.data;
	},
);

export const getPopularQuizType = createAsyncThunk(
	'quizType/getPopularQuizType',
	async () => {
		const response = await getPopularTypeApi();
		return response.data.popularType;
	},
);

const createQuizTypeSlice = createSlice({
	name: 'quizType',
	initialState,
	reducers: {
		saveQuizType(state, action) {
			state.savedQuizType.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuizType.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchQuizType.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.quizType = action.payload;
			})
			.addCase(fetchQuizType.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addNewQuizType.fulfilled, (state, action) => {
				state.quizType.push(action.payload);
			})
			.addCase(getPopularQuizType.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(getPopularQuizType.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.popularType = action.payload;
			})
			.addCase(getPopularQuizType.rejected, (state) => {
				state.loading = false;
				state.success = false;
			});
	},
});

export const { saveQuizType } = createQuizTypeSlice.actions;

export default createQuizTypeSlice.reducer;
