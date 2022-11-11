import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import Question, { modeType } from '../../components/Question/Question';
import classes from './AnswerQuizPage.module.scss';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import QuizTimer from '../../components/QuizTimer/QuizTimer';
import SubmitLeaveButton from '../../components/SubmitLeaveButton/SubmitLeaveButton';
import { addStatus } from '../../features/answer/answerSlice';

function AnswerQuizPage() {
	const dispatch = useDispatch();
	const setTimer = useSelector((state) => state.answer.setTimer);
	const { quizId } = useParams();
	useEffect(() => {
		if (quizId) {
			dispatch(getQuizByInfo({ code: quizId }));
		}
	}, []);
	const [answers, setAnswers] = useState({});
	const {
		name = '',
		questions = [],
		timeLimit = '',
	} = useSelector((state) => state.quiz.currentQuiz || {});
	const [quizForm, setQuizForm] = useState({
		startTime: '',
	});

	useEffect(() => {
		setQuizForm({ ...quizForm, startTime: new Date() });
	}, []);

	useEffect(() => {
		if (quizForm.startTime === '') {
			return;
		}
		dispatch(addStatus(quizForm));
	}, [quizForm.startTime]);

	return (
		<div className={classes.answerQuiz__page}>
			<div className={classes.answerQuiz__container}>
				<div className={classes.answerQuiz__title}>
					<p>{name}</p>
				</div>
				<div className={classes.answerQuiz__header}>
					<section className={classes.answerQuiz__progress}>
						<ProgressBar
							completedNum={Object.keys(answers).length}
							totalNum={questions.length}
							width="100%"
						/>
					</section>
					<section className={classes.answerQuiz__timer}>
						{setTimer ? (
							<QuizTimer
								quizId={quizId}
								timeLimit={timeLimit}
								questions={questions}
								userAnswer={answers}
							/>
						) : null}
					</section>
				</div>
				<div className={classes.answerQuiz__content}>
					{questions.map((item) => (
						<Question
							mode={modeType.EDIT}
							question={item}
							key={item._id}
							setUserAnswer={(answer) =>
								setAnswers((useranswers) => ({
									...useranswers,
									[item._id]: answer,
								}))
							}
						/>
					))}
				</div>
				<div className={classes.answerQuiz__btnGroup}>
					<SubmitLeaveButton quizId={quizId} userAnswer={answers} />
				</div>
			</div>
		</div>
	);
}

export default AnswerQuizPage;
