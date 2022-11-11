import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	addStatus,
	creatAnswers,
	resetSubmit,
} from '../../features/answer/answerSlice';
import classes from './SubmitLeaveButton.module.scss';
import { addTakeQuiz } from '../../features/takeQuiz/takeQuizSlice';

function SubmitLeaveButton({ quizId, userAnswer }) {
	const { questions = [] } = useSelector(
		(state) => state.quiz.currentQuiz || {},
	);
	const startTime = useSelector((state) => state.answer.startTime);
	const [quizForm, setQuizForm] = useState({
		status: null,
		startTime: '',
		submitTime: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!(quizForm.status === null)) {
			dispatch(addStatus(quizForm));
			dispatch(creatAnswers(userAnswer));
			dispatch(addTakeQuiz({ quizForm, quizId, userAnswer, questions }));
			navigate(`/admin/finish-quiz/${quizId}`);
		}
	}, [quizForm.status]);

	const handleSubmit = () => {
		setQuizForm({
			status: true,
			startTime,
			submitTime: new Date(),
		});
		dispatch(resetSubmit(true));
	};

	const handleLeave = () => {
		navigate(-1);
	};

	return (
		<div className={classes.btnWrapper}>
			<Button
				className={classes.button__submit}
				variant="outlined"
				onClick={handleSubmit}
			>
				Submit
			</Button>
			<Button
				className={classes.button__leave}
				variant="outlined"
				onClick={handleLeave}
			>
				Leave
			</Button>
		</div>
	);
}

export default SubmitLeaveButton;
