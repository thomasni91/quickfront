import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL, QUIZ_TYPE_API } from './endPoints';
import api from '../services/api';

export const getPopularTypeApi = () => api.get(`quiz-type/popular`);

export const getQuizTypeApi = () => api.get(QUIZ_TYPE_API);

export function getQuizType(token) {
	const [data, setData] = useState({
		res: '',
		err: '',
	});
	useEffect(() => {
		const get = async () => {
			try {
				const response = await axios.get(`${API_URL}/quiz-type`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setData({ ...data, res: response });
			} catch (error) {
				setData({ ...data, err: error });
			}
		};
		get();
	}, []);
	return data;
}

export function addQuizType(bodyParameters, token) {
	try {
		const response = axios.post(`${API_URL}/quiz-type`, bodyParameters, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response;
	} catch (error) {
		return error;
	}
}
