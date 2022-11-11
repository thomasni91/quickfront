import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Question, { modeType } from '../../components/Question/Question';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import gradesCalculation from '../../utils/gradesCalculation';
import classes from './FinishQuiz.module.scss';

const calculateQuizTime = () => {
	const startTime = useSelector((state) => state.answer.startTime);
	const submitTime = useSelector((state) => state.answer.submitTime);
	const startTimeArray = startTime
		?.toLocaleTimeString()
		.split(':')
		.map((i) => parseInt(i, 10));
	const submitTimeArray = submitTime
		?.toLocaleTimeString()
		.split(':')
		.map((i) => parseInt(i, 10));
	if (startTimeArray && submitTimeArray) {
		let quizHour =
			submitTimeArray[0] >= startTimeArray[0]
				? submitTimeArray[0] - startTimeArray[0]
				: submitTimeArray[0] - startTimeArray[0] + 24;
		if (submitTimeArray[1] < startTimeArray[1]) {
			quizHour -= 1;
		}
		let quizMiniute =
			submitTimeArray[1] >= startTimeArray[1]
				? submitTimeArray[1] - startTimeArray[1]
				: submitTimeArray[1] - startTimeArray[1] + 60;
		if (quizHour === 0 && quizMiniute === 1) quizMiniute = 2;
		const quizTime =
			quizHour === 0 && quizMiniute === 0 ? 1 : quizHour * 60 + quizMiniute;
		return quizTime;
	}
	return 0;
};

function FinishQuiz() {
	const submit = useSelector((state) => state.answer.submit);
	const { quizId } = useParams();
	const success = useSelector((state) => state.answer.success);
	const userAnswers = useSelector((state) => state.answer.userAnswer);
	const dispatch = useDispatch();
	const quizTime = calculateQuizTime();

	useEffect(() => {
		if (quizId) {
			dispatch(getQuizByInfo({ code: quizId }));
		}
	}, []);
	const { questions } = useSelector((state) => state.quiz.currentQuiz || {});
	const grade = gradesCalculation(questions, userAnswers);

	return (
		<div className={classes.container}>
			{!submit && (
				<>
					<h3>Sorry, time up</h3>
					<span>You didn&apos;t complete the quiz</span>
				</>
			)}
			{submit && (
				<>
					<h3>Congratulations! 🎉</h3>
					<span>
						{quizTime
							? `You have complete the quiz. It takes ${quizTime} ${
									quizTime === 1 ? 'minute' : 'mintues'
							  } and the accuracy
						rate is `
							: null}
						<span className={classes.grade}>{grade.toFixed(2)}%</span>
					</span>
				</>
			)}
			{success ? (
				questions.map((item) => (
					<Question
						question={item}
						mode={modeType.SHOW_RESULT}
						key={item._id}
						userAnswers={userAnswers[item._id]?.userAnswer}
					/>
				))
			) : (
				<Loading />
			)}
		</div>
	);
}

export default FinishQuiz;
