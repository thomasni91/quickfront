import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { QUIZ_API } from '../../api/endPoints';
import {
	createQuizApi,
	fetchAllQuizApi,
	getQuizByUserApi,
	saveQuizCover,
} from '../../api/quizApi';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	quizzes: [],
	currentQuiz: null,
	userQuizzes: [],
	quiz: {},
	filteredQuizList: [],
	quizId: '',
};

export const fetchAllQuiz = createAsyncThunk('quiz/fetchAllQuiz', async () => {
	const response = await fetchAllQuizApi();
	return response.data;
});

export const getQuizByUser = createAsyncThunk(
	'quiz/fetchUserCreatedQuiz',
	async (thunkAPI) => {
		try {
			const response = await getQuizByUserApi();
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.data.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);

export const getQuizByInfo = createAsyncThunk(
	'quiz/fetchQuiz',
	async (data, thunkAPI) => {
		const { code: info } = data;
		try {
			const response = await api.get(`${QUIZ_API}/${info}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);

export const getQuestionByQuizId = createAsyncThunk(
	'quiz/getQuestionByQuizId',
	async ({ quizId }, thunkAPI) => {
		try {
			const response = await api.get(`${QUIZ_API}/${quizId}`);
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.data.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);
export const addQuizAsync = createAsyncThunk(
	'quiz/addQuizAsync',
	async (formData, thunkAPI) => {
		try {
			const response = await createQuizApi(formData);
			thunkAPI.dispatch(
				loadNotification({
					message: 'Create quiz successful!',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.newQuiz[0]._id;
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
export const deleteQuizByID = createAsyncThunk(
	'quiz/deleteQuiz',
	async (data, thunkAPI) => {
		const { id: quizId } = data;
		try {
			const response = await api.delete(`${QUIZ_API}/${quizId}`);
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: ' Quiz is already deleted',
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);
export const updateQuizById = createAsyncThunk(
	'quiz/updateQuiz',
	async (data, thunkAPI) => {
		const { quizId, formData } = data;
		// update image , generate S3 url
		const { quizCover, name } = formData;
		if (quizCover) {
			saveQuizCover(quizId, quizCover, name);
		}
		try {
			const response = await api.patch(`${QUIZ_API}/${quizId}`, formData);
			thunkAPI.dispatch(
				loadNotification({
					message: response.data.message,
					type: 'success',
					visible: true,
				}),
			);
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	},
);
export const quizSlice = createSlice({
	name: 'quizSlice',
	initialState,
	reducers: {
		resetQuizId(state) {
			state.quizId = '';
		},
		loadQuizzes(state, action) {
			state.quizzes = action.payload.quizzes;
		},
		addQuizToList(state, action) {
			state.quizzes.push(action.payload.quiz);
		},
		loadQuiz(state, action) {
			state.quiz = action.payload;
		},
		addQuestionToQuiz(state, action) {
			state.quiz?.questions.push(action.payload.questionId);
		},
		addQuizTypeToQuiz(state, action) {
			state.quiz?.quizTypes.push(action.payload.quizTypeId);
		},
		resetSuccess(state, action) {
			state.success = action.payload;
		},
		resetQuiz(state) {
			state.quiz = initialState;
		},
		deleteQuizInQuizzes(state, action) {
			const updatedQuizzes = state.userQuizzes.filter(
				(item) => item._id !== action.payload,
			);
			state.userQuizzes = updatedQuizzes;
		},
		filterPopularQuizType(state, action) {
			const CategoryId = action.payload;
			const allQuizzes = state.quizzes;
			const filteredList = allQuizzes.filter(
				(e) => e.quizTypes.findIndex((type) => type._id === CategoryId) !== -1,
			);
			state.filteredQuizList = filteredList;
		},
		filterQuiz(state, action) {
			const {
				Time: time,
				Difficulty: difficulty,
				Category: category,
			} = action.payload;
			const timefilter = (e) => {
				switch (time) {
					case 'less then 20min':
						return e.timeLimit < 20;
					case '20-40min':
						return e.timeLimit >= 20 && e.timeLimit <= 40;
					case 'more than 40 min':
						return e.timeLimit > 40;

					default:
						return true;
				}
			};
			const filteredList = state.quizzes
				.filter(timefilter)
				.filter(
					(e) =>
						(difficulty === 'All' ? true : e.difficulty === difficulty) &&
						(category === 'All'
							? true
							: e.quizTypes.findIndex((type) => type.name === category) !== -1),
				);
			state.filteredQuizList = filteredList;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(addQuizAsync.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(addQuizAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.quizId = action.payload;
			})
			.addCase(addQuizAsync.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(getQuizByInfo.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(getQuizByInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.success = false;
				state.currentQuiz = action.payload;
			})
			.addCase(getQuizByInfo.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(fetchAllQuiz.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(fetchAllQuiz.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.quizzes = action.payload.allQuiz;
			})
			.addCase(fetchAllQuiz.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(deleteQuizByID.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(deleteQuizByID.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				const quizid = state.quizzes.findIndex((e) => e._id === action.payload);
				state.quizzes.splice(quizid, 1);
			})
			.addCase(deleteQuizByID.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(getQuizByUser.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(getQuizByUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				// Add user created quiz to the userQuizzes array
				state.userQuizzes = action.payload;
			})
			.addCase(getQuizByUser.rejected, (state) => {
				state.loading = false;
				state.success = false;
			})
			.addCase(updateQuizById.pending, (state) => {
				state.loading = true;
				state.success = false;
			})
			.addCase(updateQuizById.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateQuizById.rejected, (state) => {
				state.loading = false;
				state.success = false;
			});
	},
});

export const {
	resetQuizId,
	loadQuizzes,
	loadUserQuizzes,
	addQuestionToList,
	loadQuiz,
	addQuestionToQuiz,
	addQuizTypeToQuiz,
	resetSuccess,
	resetQuiz,
	deleteQuizInQuizzes,
	filterQuiz,
	filterPopularQuizType,
} = quizSlice.actions;
export default quizSlice.reducer;
