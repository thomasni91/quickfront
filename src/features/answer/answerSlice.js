import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import createTakeQuiz from '../../api/createTakeQuiz';
import { ANSWER_API } from '../../api/endPoints';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	submit: false,
	userAnswer: {},
	answerHistory: [],
	loading: false,
	success: true,
	erorr: '',
};

export const submitQuizAsync = createAsyncThunk(
	'answer/submitQuizAsync',
	async (data, thunkAPI) => {
		try {
			const response = await createTakeQuiz(data);

			thunkAPI.dispatch(
				loadNotification({
					message: 'Submit quiz successful!',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.message;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.data.errors[0].name || 'Something went wrong',
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const getAnswerHistoryByUserId = createAsyncThunk(
	'answer/getAnswerHistoryByUserId',
	async (thunkAPI) => {
		try {
			let totalAnswers = 0;
			const response = await api.get(`${ANSWER_API}/answer-history`);
			const data = response.data.map((e) => {
				const { value, _id: day } = e;
				totalAnswers += value;
				return { day, value };
			});
			return { totalAnswers, data };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response);
		}
	},
);
export const creatAnswers = createAsyncThunk(
	'answer/createAnswers',
	async (answers, thunkAPI) => {
		try {
			const response = await api.post(`${ANSWER_API}`, answers);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const answerSlice = createSlice({
	name: 'answerSlice',
	initialState,
	reducers: {
		resetSubmit(state, action) {
			state.submit = action.payload;
		},
		setTimer(state, action) {
			state.setTimer = action.payload;
		},
		addStatus(state, action) {
			state.status = action.payload.status;
			state.startTime = action.payload.startTime;
			state.submitTime = action.payload.submitTime;
		},
		loadAnswerHistory(state, action) {
			state.answerHistory = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAnswerHistoryByUserId.pending, (state) => {
			state.loading = true;
			state.success = false;
		});
		builder.addCase(getAnswerHistoryByUserId.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.answerHistory = action.payload;
		});
		builder.addCase(getAnswerHistoryByUserId.rejected, (state) => {
			state.loading = false;
			state.success = false;
			state.erorr = [];
		});
		builder.addCase(creatAnswers.pending, (state) => {
			state.loading = true;
			state.success = false;
		});
		builder.addCase(creatAnswers.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			const userAnswers = {};
			action.payload.data.map((e) => {
				const { creator, question, userAnswer } = e;
				return (userAnswers[question] = { creator, userAnswer });
			});
			state.userAnswer = userAnswers;
		});
		builder.addCase(creatAnswers.rejected, (state, action) => {
			state.loading = false;
			state.success = false;
			state.erorr = action.payload;
		});
	},
});

export const {
	resetSubmit,
	addStatus,
	setTimer,
	addUserAnswer,
	loadAnswerHistory,
} = answerSlice.actions;
export default answerSlice.reducer;
