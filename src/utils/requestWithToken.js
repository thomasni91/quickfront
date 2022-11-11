import axios from 'axios';
import { API_URL } from '../api/endPoints';

const requestWithToken = axios.create({
	baseURL: API_URL,
	timeout: 2000,
	headers: localStorage.getItem('auth_token')
		? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
		: {},
});
export default requestWithToken;
