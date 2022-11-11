import api from '../services/api';
import { TAKEQUIZ_API } from './endPoints';

const createTakeQuiz = ({ quizForm, quizId }) =>
	api.post(`${TAKEQUIZ_API}/${quizId}`, quizForm);

export default createTakeQuiz;
