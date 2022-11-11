import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

import { TAKEQUIZ_API } from '../../api/endPoints';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	takeQuiz: [],
};
export const getTakeQuizByUser = createAsyncThunk(
	'takeQuiz/fetchUserTakeQuiz',
	async (thunkAPI) => {
		try {
			const response = await api.get(`${TAKEQUIZ_API}/user`);
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);

export const addTakeQuiz = createAsyncThunk(
	'takeQUiz/addTakeQuiz',
	async (data, thunkAPI) => {
		const { quizId, quizForm, userAnswer, questions } = data;
		try {
			const response = await api({
				method: 'POST',
				url: `${TAKEQUIZ_API}/${quizId}`,
				data: { status: quizForm.status, userAnswer, questions },
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Submit quiz successful!',
					type: 'success',
					visible: true,
				}),
			);
			return response;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error);
		}
	},
);
export const takeQuizSlice = createSlice({
	name: 'takeQuizSlice',
	initialState,
	reducers: {
		loadTakeQuiz(state, action) {
			state.takeQuiz = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTakeQuizByUser.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(getTakeQuizByUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.takeQuiz = action.payload;
			})
			.addCase(getTakeQuizByUser.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(addTakeQuiz.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(addTakeQuiz.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addTakeQuiz.rejected, (state) => {
				state.loading = false;
				state.success = false;
			});
	},
});

export const { loadTakeQuiz } = takeQuizSlice.actions;
export default takeQuizSlice.reducer;
