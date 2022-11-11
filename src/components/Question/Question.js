import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Question.module.scss';

const questionType = {
	SINGLE_SELECTION: 'single selection',
	MULTI_CHOICE: 'multi choice',
};
export const modeType = {
	EDIT: 'EDIT',
	SHOW_RESULT: 'SHOW_RESULT',
	DISPLAY: 'DISPLAY',
};
export default function Question({
	question = {
		_id: '61fa3427f8c33d52d5066468',
		title: 'this is the sec title',
		choices: ['30', '36', '28', '50', '99', '10'],
		correctAnswer: ['30', '28'],
		type: questionType.MULTI_CHOICE,
	},
	userAnswers,
	mode,
	setUserAnswer,
}) {
	const [answers, setAnswers] = useState(userAnswers ? [...userAnswers] : []);
	const handleSingleSelection = (choice) => {
		setAnswers([choice]);
		setUserAnswer({
			creator: '61fa4a95d9fbea8a123451af',
			userAnswer: [choice],
		});
	};
	const handleMultipleSelection = (choice) => {
		setAnswers((_) => [..._, choice]);
		setUserAnswer({
			creator: '61fa4a95d9fbea8a123451af',
			userAnswer: [...answers, choice],
		});
	};
	const handleFillInBlankChange = (e) => {
		setAnswers([e.target.value]);
		setUserAnswer({
			creator: '61fa4a95d9fbea8a123451af',
			userAnswer: [e.target.value],
		});
	};

	useEffect(() => {
		if (userAnswers) {
			setAnswers([...userAnswers]);
		}
	}, [userAnswers]);

	return (
		<div className={classes.questionCard__container}>
			<h2>{question.title}</h2>
			<div className={classes.answer__container}>
				{question.type === 'fill-in-blank' ? (
					<input
						className={
							mode === modeType.SHOW_RESULT
								? `${classes.answer__selected} ${
										question.correctAnswer[0] === answers[0]
											? classes.answer__result
											: null
								  }`
								: null
						}
						placeholder={
							mode !== modeType.SHOW_RESULT ? '' : question.correctAnswer[0]
						}
						onChange={handleFillInBlankChange}
						disabled={
							mode === modeType.SHOW_RESULT || mode === modeType.DISPLAY
						}
					/>
				) : (
					<>
						{question.choices
							.map((choice) => choice.toString())
							.map((choice) => (
								<button
									className={`${
										answers.includes(choice) ? classes.answer__selected : null
									} ${
										mode === modeType.SHOW_RESULT &&
										question.correctAnswer.includes(choice)
											? classes.answer__result
											: null
									}`}
									type="button"
									key={choice}
									disabled={
										mode === modeType.SHOW_RESULT || mode === modeType.DISPLAY
									}
									onClick={() =>
										question.type === questionType.SINGLE_SELECTION
											? handleSingleSelection(choice)
											: handleMultipleSelection(choice)
									}
								>
									{choice}
								</button>
							))}
					</>
				)}
			</div>
			{mode === modeType.SHOW_RESULT ? (
				<p>
					{answers.join()
						? `Your answer is ${answers.join()}`
						: 'You did not answer this question'}
					, correct answer is {question.correctAnswer.join()}
				</p>
			) : null}
		</div>
	);
}

Question.defaultProps = {
	mode: 'DISPLAY',
	userAnswers: null,
};
Question.propTypes = {
	question: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		choice: PropTypes.arrayOf(PropTypes.string),
		correctAnswer: PropTypes.arrayOf(PropTypes.string),
		type: PropTypes.string,
	}).isRequired,
	mode: PropTypes.string,
	userAnswers: PropTypes.arrayOf(PropTypes.string),
};
