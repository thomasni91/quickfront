import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Question, { modeType } from '../../components/Question/Question';
import StyledSelectMenu from '../../components/StyledSelectMenu/StyledSelectMenu';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import { getTakeQuizByUser } from '../../features/takeQuiz/takeQuizSlice';
import classes from './CheckQuizResult.module.scss';

function CheckQuizResult() {
	const [attempt, setAttempt] = useState('Attempt 1');
	const { quizId } = useParams();
	const dispatch = useDispatch();
	const takeQuizList = useSelector((state) => state.takeQuiz?.takeQuiz);
	const userAnswers = takeQuizList
		.filter((item) => item.quiz?._id === quizId)
		.map((item) => item.userAnswer);

	const attemptId = Number(attempt.replace('Attempt ', '')) - 1;
	const { questions } = takeQuizList.filter(
		(item) => item.quiz?._id === quizId,
	)[attemptId];

	useEffect(() => {
		if (quizId) {
			dispatch(getQuizByInfo({ code: quizId }));
			dispatch(getTakeQuizByUser());
		}
	}, []);
	const options = userAnswers.map((item, i) => `Attempt ${i + 1}`);

	const handleSelect = (e) => {
		setAttempt(e.target.value);
	};
	return (
		<div className={classes.quizResult__container}>
			<div className={classes.quizResult__header}>
				<h3 className={classes.quizResult__title}>Quiz Result</h3>
				<div className={classes.quizResult__textContainer}>
					<p>
						You have {userAnswers.length}{' '}
						{userAnswers.length === 1 ? 'Attempt' : 'Attempts'}
					</p>
				</div>
			</div>
			<div className={classes.quizResult__selectBoxContainer}>
				<StyledSelectMenu
					title="Select your attempt"
					value={attempt}
					onChange={handleSelect}
					options={options}
				/>
			</div>
			{questions?.map((item) => (
				<Question
					question={item}
					mode={modeType.SHOW_RESULT}
					key={item._id}
					userAnswers={userAnswers[attemptId][item._id]?.userAnswer}
				/>
			))}
		</div>
	);
}

export default CheckQuizResult;
