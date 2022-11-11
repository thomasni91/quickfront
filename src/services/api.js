import axios from 'axios';
import { API_URL } from '../api/endPoints';

// create axios instance
const instance = axios.create({
	baseURL: API_URL,
	timeout: 5000,
});

export default instance;
