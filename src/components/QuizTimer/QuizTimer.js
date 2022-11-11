import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './QuizTimer.module.scss';
import CountDownTimer from './CountDownTimer';
import {
	addStatus,
	creatAnswers,
	resetSubmit,
	submitQuizAsync,
} from '../../features/answer/answerSlice';

function QuizTimer({ quizId, timeLimit, questions, userAnswer }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const hoursMinSecs = {
		hours: Math.floor(timeLimit / 60),
		minutes: timeLimit % 60,
		seconds: 0,
	};
	const [quizForm, setQuizForm] = useState({
		status: null,
		startTime: '',
		submitTime: '',
	});

	useEffect(() => {
		setQuizForm({ ...quizForm, startTime: new Date() });
	}, []);

	useEffect(() => {
		if (quizForm.startTime !== '') {
			dispatch(addStatus(quizForm));
		}
	}, [quizForm.startTime]);

	useEffect(() => {
		if (!(quizForm.status === null)) {
			dispatch(addStatus(quizForm));
			dispatch(submitQuizAsync({ quizForm, quizId }));
			dispatch(creatAnswers(userAnswer));
			navigate(`/admin/finish-quiz/${quizId}`);
		}
	}, [quizForm.status]);

	const handleFinish = () => {
		const finish = questions.length === Object.keys(userAnswer).length;
		setQuizForm({
			...quizForm,
			status: finish,
			submitTime: new Date(),
		});
		dispatch(resetSubmit(finish));
	};

	return (
		<span className={classes.timer}>
			<CountDownTimer
				timeLimit={timeLimit}
				hoursMinSecs={hoursMinSecs}
				handleFinish={handleFinish}
			/>
		</span>
	);
}

export default QuizTimer;
