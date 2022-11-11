import axiosInstance from './api';
import { logout } from '../features/login/loginSlice';
import { loadNotification } from '../features/notification/notificationSlice';
import { getToken } from './localStorage';
import { cleanUser } from '../features/user/userSlice';

const setup = (store) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = getToken();
			// Add token to url expect auth request
			if (token && !config.url.includes('auth')) {
				// eslint-disable-next-line no-param-reassign
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error),
	);

	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			let message = '';
			if (error && error.response) {
				const { status } = error.response;
				switch (status) {
					case 400:
						message = 'Bad Request, please check again!';
						break;
					case 401:
						message = 'Unauthorized, please login again!';
						// logout app if token unthorized
						store.dispatch(logout());
						store.dispatch(cleanUser());
						break;
					case 404:
						message = 'No resource found!';
						break;
					default:
						break;
				}
			}
			if (error.message.includes('timeout')) message = 'Request Timeout!';
			if (error.message.includes('Network'))
				message = window.navigator.onLine
					? 'Server error! '
					: 'Your are offline!';

			// dispatch error message to notification
			store.dispatch(
				loadNotification({
					message,
					type: 'error',
					visible: true,
				}),
			);
			return Promise.reject(error);
		},
	);
};

export default setup;
