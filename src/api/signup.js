import axios from 'axios';
import { SIGNUP_API } from './endPoints';

const signup = async (data) => {
	try {
		const response = await axios({
			method: 'post',
			url: SIGNUP_API,
			data,
		});
		return response;
	} catch (err) {
		// error response body from backend
		return err.response;
	}
};

export default signup;
