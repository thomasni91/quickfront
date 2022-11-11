import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { googleAsync } from '../../features/login/loginSlice';
import { loadNotification } from '../../features/notification/notificationSlice';
import classes from './LoginWithGoogle.module.scss';

function LoginWithGoogle() {
	const dispatch = useDispatch();
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const loginSuccess = (res) => {
		const request = { idToken: res.tokenId };
		if (request) {
			dispatch(googleAsync(request));
		}
	};
	const loginFailure = () => {
		dispatch(
			loadNotification({
				message: 'Something wrong with Google, Please try again',
				type: 'error',
				visible: true,
			}),
		);
	};

	return (
		<div className={classes.btn}>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login with Google"
				onSuccess={loginSuccess}
				onFailure={loginFailure}
				cookiePolicy="single_host_origin"
			/>
		</div>
	);
}

export default LoginWithGoogle;
