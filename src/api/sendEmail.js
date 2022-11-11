import axios from 'axios';
import { SEND_EMAIL_API, SIGNUP_VERIFY_API } from './endPoints';

export async function signupEmailVerified(token) {
	try {
		const response = await axios({
			method: 'post',
			url: SIGNUP_VERIFY_API,
			headers: { Authorization: `Bearer ${token}` },
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

export async function sendEmailApiForSignup(recipientEmail) {
	try {
		const response = await axios({
			method: 'post',
			url: `${SEND_EMAIL_API}/signup`,
			data: recipientEmail,
		});
		return response;
	} catch (error) {
		return error.response;
	}
}
