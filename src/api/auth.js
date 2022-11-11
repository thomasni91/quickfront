import api from '../services/api';
import { API_URL, SIGNUP_API, GOOGLEAUTH_API, LOGIN_API } from './endPoints';

export const googleAuthApi = async (data) => api.post(GOOGLEAUTH_API, data);

export const signupApi = async (data) => api.post(SIGNUP_API, data);

export const loginApi = async (data) => api.post(LOGIN_API, data);

export const deleteUserApi = async () => api.delete(`${API_URL}/users`);
