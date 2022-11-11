import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { QUIZ_API, UPLOAD_QUIZ_COVER, GET_QUIZ_COVER } from './endPoints';

// fetchAllQuiz
export const fetchAllQuizApi = () => api.get(QUIZ_API);

export async function saveQuizCover(quizId, file, filename) {
	const imageFile = new File([file], filename);
	const imageFormData = new FormData();
	imageFormData.append('quizCover', imageFile);
	imageFormData.append('quizCoverId', quizId);

	const result = await api({
		method: 'post',
		url: UPLOAD_QUIZ_COVER,
		data: imageFormData,
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	// save url into backend
	const { imageUrl } = result.data;
	api.patch(`${QUIZ_API}/${quizId}`, { imageUrl });
	return imageUrl;
}
// create quiz
export const createQuizApi = async (data) => {
	// create quiz first
	const reseponse = await api.post(QUIZ_API, data);
	const { _id: quizId } = reseponse.data.newQuiz[0];
	// crate file by blob url and sent to s3
	const { quizCover, name } = data;
	if (quizCover) {
		await saveQuizCover(quizId, quizCover, name);
	}
	return reseponse;
};

export function deleteQuizByID(quizId, token) {
	const [data, setData] = useState({
		res: '',
		err: '',
	});
	useEffect(() => {
		const post = async () => {
			try {
				const response = await axios.delete(`${QUIZ_API}/${quizId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setData({ ...data, res: response });
			} catch (error) {
				setData({ ...data, err: error });
			}
		};
		post();
	}, []);
	return data;
}
export const getQuizCover = (quizId) => api.get(`${GET_QUIZ_COVER}/${quizId}`);
// get quiz by code or id
export const getQuizByInfo = (info) => {
	api.get(`${QUIZ_API}/${info}`);
};

export const getQuizByUserApi = () => api.get(`${QUIZ_API}/user`);
