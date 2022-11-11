import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	RESET_PASSWORD_API,
	SEND_EMAIL_API,
	USER_API,
} from '../../api/endPoints';
import { uploadUserAvatar } from '../../api/userApi';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	user: null,
	username: null,
	avatar: null,
	loading: false,
	error: null,
	message: null,
};

export const changeUsername = createAsyncThunk(
	'user/changeUsername',
	async (data, thunkAPI) => {
		const { token, username, email } = data;
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email,
					name: username,
				},
				url: `${USER_API}/changeusername`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Username updated successful',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.user;
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

export const resendEmailResetPassword = createAsyncThunk(
	'user/resendEmailResetPassword',
	async (recipientEmail, thunkAPI) => {
		try {
			const response = await axios({
				method: 'POST',
				data: recipientEmail,
				url: `${SEND_EMAIL_API}/forgot-password`,
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Email resend, please check your email',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.message;
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

export const sendEmailApiForResetPassword = createAsyncThunk(
	'user/sendEmailResetPassword',
	async (recipientEmail, thunkAPI) => {
		try {
			const response = await axios({
				method: 'POST',
				data: recipientEmail,
				url: `${SEND_EMAIL_API}/forgot-password`,
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Please verify your email to reset password',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.message;
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

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (data, thunkAPI) => {
		const { token, password } = data;
		try {
			const response = await axios({
				method: 'POST',
				data: { password },
				url: `${RESET_PASSWORD_API}`,
				headers: { Authorization: `Bearer ${token}` },
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Password reset successful',
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

export const changePassword = createAsyncThunk(
	'user/changePassword',
	async (data, thunkAPI) => {
		const { token, email, oldPassword, password } = data;
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email,
					oldPassword,
					password,
				},
				url: `${USER_API}/changepassword`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			thunkAPI.dispatch(
				loadNotification({
					message: 'Password updated successful',
					type: 'success',
					visible: true,
				}),
			);
			return response.data.user;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const changeAvatar = createAsyncThunk(
	'user/changeAvatar',
	async (data, thunkAPI) => {
		try {
			const imageUrl = await uploadUserAvatar(data);
			thunkAPI.dispatch(
				loadNotification({
					message: 'Avatar updated successful',
					type: 'success',
					visible: true,
				}),
			);
			return imageUrl;
		} catch (error) {
			thunkAPI.dispatch(
				loadNotification({
					message: error,
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loadAvatar(state, action) {
			state.avatar = action.payload;
		},
		cleanUser(state) {
			state.user = null;
			state.username = null;
			state.avatar = null;
			state.loading = false;
			state.error = null;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(changeUsername.pending, (state) => {
				state.loading = true;
			})
			.addCase(changeUsername.fulfilled, (state, action) => {
				state.user = action.payload.email;
				state.username = action.payload.name;
				state.loading = false;
			})
			.addCase(changeUsername.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(changePassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(changePassword.fulfilled, (state, action) => {
				state.user = action.payload.email;
				state.name = action.payload.name;
				state.loading = false;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(sendEmailApiForResetPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(sendEmailApiForResetPassword.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(sendEmailApiForResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(resendEmailResetPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(resendEmailResetPassword.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(resendEmailResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(changeAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(changeAvatar.fulfilled, (state, action) => {
				state.loading = false;
				state.avatar = action.payload;
			})
			.addCase(changeAvatar.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { loadAvatar, cleanUser } = userSlice.actions;
export default userSlice.reducer;
