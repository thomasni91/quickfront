import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupApi } from '../../api/auth';
import { sendEmailApiForSignup } from '../../api/sendEmail';
import { loadNotification } from '../notification/notificationSlice';

const initialState = {
	value: '',
	loading: false,
	success: false,
	error: null,
	email: '',
};

export const signupResendEmail = createAsyncThunk(
	'signup/resendEmail',
	async (email, thunkApi) => {
		try {
			const response = await sendEmailApiForSignup({
				recipientEmail: email,
			});
			thunkApi.dispatch(
				loadNotification({
					message: 'Email resend , please check your email',
					type: 'success',
					visible: true,
				}),
			);
			return response.data;
		} catch (error) {
			thunkApi.dispatch(
				loadNotification({
					message: error.message,
					type: 'error',
					visible: true,
				}),
			);
			return thunkApi.rejectWithValue(error);
		}
	},
);

export const signupAsync = createAsyncThunk(
	'signup/signupAsync',
	async (formData, thunkAPI) => {
		try {
			await signupApi(formData);
			const response = await sendEmailApiForSignup({
				recipientEmail: formData.email,
			});
			// The value return becomes the `fulfilled` action payload
			if (response.status === 200) {
				thunkAPI.dispatch(
					loadNotification({
						message: 'Please verify your email address in your mail box',
						type: 'success',
						visible: true,
					}),
				);
				return formData.email;
			}
			if (response.status === 400) {
				// return the value to the 'rejected' action payload
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
					message: 'Something went wrong',
					type: 'error',
					visible: true,
				}),
			);
			return thunkAPI.rejectWithValue(response.data);
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

export const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		resetSignupStatus: (state) => {
			state.success = false;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(signupAsync.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(signupAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.email = action.payload;
			})
			.addCase(signupAsync.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload;
			})
			.addCase(signupResendEmail.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(signupResendEmail.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(signupResendEmail.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload;
			});
	},
});

export const { resetSignupStatus } = signupSlice.actions;

export default signupSlice.reducer;
