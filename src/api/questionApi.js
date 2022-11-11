import api from '../services/api';
import { QUESTION_API, QUIZ_API } from './endPoints';

export const addQuestion = (data) => api.post(QUESTION_API, data);

export const addQuestionToQuizApi = (quizId, questionId) =>
	api.post(`${QUIZ_API}/${quizId}/questions/${questionId}`);

export const updateQuestion = (questionId, data) =>
	api.patch(`${QUESTION_API}/${questionId}`, data);

export const deleteQuestion = (questionId, data) =>
	api({
		method: 'DELETE',
		url: `${QUESTION_API}/${questionId}`,
		data,
	});
