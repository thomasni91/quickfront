import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, deleteUserApi, googleAuthApi } from '../../api/auth';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	user: null,
	userId: null,
	userAvatar: null,
	isLogin: false,
	loading: false,
	token: null,
	error: null,
	name: null,
	createdAt: null,
	isCreateQuiz: false,
	loginMethod: null,
};
export const handleLogin = createAsyncThunk(
	'login/handleLogin',
	async (data, thunkAPI) => {
		try {
			const response = await loginApi(data);
			thunkAPI.dispatch(
				loadNotification({
					message: 'Sign in successful',
					type: 'success',
					visible: true,
				}),
			);
			return { ...response.data, email: data.email };
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.data.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const deleteUserAsync = createAsyncThunk(
	'login/deleteUser',
	async (data, thunkAPI) => {
		try {
			const response = await deleteUserApi();
			thunkAPI.dispatch(
				loadNotification({
					message: 'Deleted successful',
					type: 'success',
					visible: true,
				}),
			);
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error.response.data.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const googleAsync = createAsyncThunk(
	'googleLogin/googleAsync',
	async (data, thunkAPI) => {
		try {
			const response = await googleAuthApi(data);
			thunkAPI.dispatch(
				loadNotification({
					message: 'Sign in successful',
					type: 'success',
					visible: true,
				}),
			);
			return response.data;
		} catch (err) {
			thunkAPI.dispatch(
				loadNotification({
					message: err.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(err);
		}
	},
);
export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.user = payload.user;
		},
		setName(state, action) {
			state.name = action.payload;
		},
		logout(state) {
			state.user = null;
			state.isLogin = false;
			state.loading = false;
			state.token = null;
			state.error = null;
			state.isCreateQuiz = false;
			localStorage.removeItem('auth_token');
		},
		linkToCreateQuiz(state, action) {
			state.isCreateQuiz = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLogin.pending, (state) => {
				state.loading = true;
			})
			.addCase(handleLogin.fulfilled, (state, action) => {
				state.error = null;
				state.token = action.payload.token;
				state.user = action.payload.email;
				state.userId = action.payload.id;
				state.isLogin = true;
				state.loading = false;
				state.name = action.payload.name;
				state.createdAt = action.payload.createdAt;
				localStorage.setItem('auth_token', state.token);
				state.loginMethod = 'email';
			})
			.addCase(handleLogin.rejected, (state, action) => {
				state.user = null;
				state.isLogin = false;
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(googleAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(googleAsync.fulfilled, (state, action) => {
				state.error = null;
				state.token = action.payload.token;
				state.user = action.payload.email;
				state.userId = action.payload.id;
				state.isLogin = true;
				state.loading = false;
				localStorage.setItem('auth_token', state.token);
				state.loginMethod = 'google';
			})
			.addCase(googleAsync.rejected, (state, action) => {
				state.user = null;
				state.isLogin = false;
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(deleteUserAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteUserAsync.fulfilled, (state) => {
				state.token = null;
				state.user = null;
				state.isLogin = false;
				state.loading = false;
				localStorage.removeItem('auth_token');
			})
			.addCase(deleteUserAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setUser, logout, linkToCreateQuiz, setName } =
	loginSlice.actions;
export default loginSlice.reducer;
