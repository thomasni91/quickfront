import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	addQuestion,
	addQuestionToQuizApi,
	updateQuestion,
	deleteQuestion,
} from '../../api/questionApi';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	questionList: [],
	question: '',
	title: '',
	buttonDisabled: false,
};

export const createQuestionAndLinkToQuiz = createAsyncThunk(
	'question/handleQuestion',
	async ({ questionList, quizId }, thunkAPI) => {
		try {
			const res = await addQuestion(questionList);
			const response = await addQuestionToQuizApi(
				quizId,
				res.data.question._id,
			);
			if (response.status === 200) {
				thunkAPI.dispatch(
					loadNotification({
						message: 'Add question successful',
						type: 'success',
						visible: true,
					}),
				);
				return response.data;
			}
			if (response.status === 400) {
				thunkAPI.dispatch(
					loadNotification({
						message: response.data.error,
						type: 'error',
						visible: true,
					}),
				);
				return thunkAPI.rejectWithValue(response.data.error);
			}
			thunkAPI.dispatch(
				loadNotification({
					message: 'Something went wrong!',
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(response.data);
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const addQuestionToQuiz = createAsyncThunk(
	'question/addQuestionToQuiz',
	async ({ questionForm, token }, thunkAPI) => {
		try {
			const response = await addQuestionToQuizApi(questionForm, token);
			if (response.status === 201) {
				return response.data.message;
			}
			if (response.status === 400) {
				return thunkAPI.rejectWithValue(response.data.error);
			}
			return thunkAPI.rejectWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const updateQuestionToQuiz = createAsyncThunk(
	'question/updateQuestionToQuiz',
	async ({ questionId, data }, thunkAPI) => {
		try {
			const response = await updateQuestion(questionId, data);
			if (response.status === 201) {
				return response.data.message;
			}
			if (response.status === 400) {
				return thunkAPI.rejectWithValue(response.data.error);
			}
			return thunkAPI.rejectWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const deleteQuestionFromQuiz = createAsyncThunk(
	'question/deleteQuestionFromQuiz',
	async ({ questionId, data }, thunkAPI) => {
		try {
			const response = await deleteQuestion(questionId, data);
			if (response.status === 201) {
				return response.data.message;
			}
			if (response.status === 400) {
				return thunkAPI.rejectWithValue(response.data.error);
			}
			return thunkAPI.rejectWithValue(response.data.error);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const questionSlice = createSlice({
	name: 'questionSlice',
	initialState,
	reducers: {
		loadQuestionList(state, action) {
			state.questionList.push(action.payload);
		},
		loadQuestion(state, action) {
			state.question = action.payload;
		},
		typeQuestion(state, action) {
			state.title = action.payload.title;
			state.choices = action.payload.choices;
			state.correctAnswer = action.payload.correctAnswer;
			state.type = action.payload.type;
		},
		changeDisabledButton(state, action) {
			state.buttonDisabled = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createQuestionAndLinkToQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(createQuestionAndLinkToQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.questionList.push(action.payload);
			})
			.addCase(createQuestionAndLinkToQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateQuestionToQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateQuestionToQuiz.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateQuestionToQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteQuestionFromQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteQuestionFromQuiz.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(deleteQuestionFromQuiz.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {
	loadQuestion,
	loadQuestionList,
	typeQuestion,
	changeDisabledButton,
} = questionSlice.actions;
export default questionSlice.reducer;
