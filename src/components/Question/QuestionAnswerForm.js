import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import { nanoid } from 'nanoid';
import {
	changeDisabledButton,
	createQuestionAndLinkToQuiz,
	typeQuestion,
	updateQuestionToQuiz,
	deleteQuestionFromQuiz,
} from '../../features/question/questionSlice';
import CreateMultipleChoice from '../CreateMultipleChoice/CreateMultipleChoice';
import {
	questionSchema,
	questionEditSchema,
} from '../../validation/questionValidation';
import FillInBlank from '../FillInBlank/FillInBlankQuestion';
import classes from './MultipleChoice.module.scss';
import { loadNotification } from '../../features/notification/notificationSlice';
import { getQuizByInfo } from '../../features/quiz/quizSlice';

const useStyles = makeStyles(() => ({
	noBorder: {
		border: 'none !important',
	},
}));

function QuestionAnswerForm({
	questionList,
	indexes,
	setQuestionLists,
	setQuestionStatus,
	status,
	collapse,
}) {
	const { type, answerOptions, correctAnswer, choices, title } = questionList;
	const quizIdString = useParams();
	const { quizId } = quizIdString;
	const dispatch = useDispatch();
	const renderFillInBlank = 'fill-in-blank';
	const muiClasses = useStyles();
	const [error, setError] = useState();
	const [disable, setDisable] = useState(false);
	const quizInfo = useSelector((state) => state.quiz.currentQuiz);
	const answerFormStatus = {
		UPDATE: 'update',
		SAVE: 'save',
	};

	const handleDelete = () => {
		dispatch(changeDisabledButton(false));
		setQuestionLists((prevQuestionList) =>
			prevQuestionList.filter((_, i) => indexes !== i),
		);
		setQuestionStatus((prevQuestionStatus) =>
			prevQuestionStatus.filter((_, i) => indexes !== i),
		);
		const data = {
			creator: quizInfo.creator,
		};
		if (questionList._id) {
			try {
				dispatch(
					deleteQuestionFromQuiz({
						questionId: questionList._id,
						data,
					}),
				);
				dispatch(
					loadNotification({
						message: 'Question deleted',
						type: 'success',
						visible: true,
					}),
				);
			} catch (err) {
				setError(err.error);
			}
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		let errorMessage = null;
		if (type !== 'fill-in-blank') {
			const removeDuplicateChoice = [...new Set(choices)];
			errorMessage =
				(title === '' && 'No question title') ||
				(choices.length < 2 && 'Need at least two answer options') ||
				(correctAnswer.length === 0 && 'Please set correct answer') ||
				(removeDuplicateChoice.length !== choices.length && 'Duplicate Choice');
		} else {
			errorMessage =
				(title === '' && 'No question title') ||
				(choices.length < 1 && 'Please input answer');
		}
		if (typeof errorMessage === 'string') {
			dispatch(
				loadNotification({
					message: errorMessage,
					type: 'error',
					visible: true,
				}),
			);
			return;
		}
		setDisable(true);
		dispatch(changeDisabledButton(false));
		dispatch(typeQuestion(questionList));
		const result = questionSchema.validate(questionList, {
			abortEarly: false,
		});
		if (!result.error) {
			try {
				await dispatch(createQuestionAndLinkToQuiz({ questionList, quizId }));
				dispatch(getQuizByInfo({ code: quizId }));
			} catch (err) {
				setError(err.error);
			}
		}
	};

	const handleEdit = (e) => {
		e.preventDefault();
		const removeDuplicateChoice = [...new Set(choices)];
		if (removeDuplicateChoice.length !== choices.length) {
			dispatch(
				loadNotification({
					message: 'Duplicate Choice',
					type: 'error',
					visible: true,
				}),
			);
			return;
		}
		setDisable(true);
		dispatch(changeDisabledButton(false));
		dispatch(typeQuestion(questionList));
		const questionId = questionList._id;
		const data = {
			creator: quizInfo.creator,
			id: questionList._id,
			title: questionList.title,
			choices: questionList.choices,
			correctAnswer: questionList.correctAnswer,
			type: questionList.type,
			answerOptions: questionList.answerOptions,
		};
		const result = questionEditSchema.validate(data, {
			abortEarly: false,
		});
		if (!result.error) {
			try {
				dispatch(updateQuestionToQuiz({ questionId, data }));
				dispatch(
					loadNotification({
						message: 'This question is updated successfully',
						type: 'success',
						visible: true,
					}),
				);
				return;
			} catch (err) {
				setError(err.error);
			}
		}
	};

	const handleQuestionChange = (value) => {
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				if (element !== questionList) {
					return element;
				}
				return {
					...element,
					title: value,
				};
			}),
		);
	};
	useEffect(() => {
		dispatch(typeQuestion(questionList));
	}, [questionList.title]);

	const handleChangeQA = (value) => {
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				if (element !== questionList) {
					return element;
				}
				return {
					...element,
					choices: [value],
					correctAnswer: [value],
				};
			}),
		);
	};

	const handleAddOptions = (event) => {
		event.preventDefault();
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				if (element !== questionList) {
					return element;
				}
				return {
					...element,
					answerOptions: [
						...answerOptions,
						{ id: nanoid(), correctedAnswer: false, choice: '' },
					],
				};
			}),
		);
	};

	const handleChangeOptionAnswer = (index, value) => {
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				const returnItems = element.answerOptions.map((item, i) => {
					if (index !== i) {
						return item;
					}
					if (value === '') {
						return {
							...item,
							choice: value,
							correctedAnswer: false,
						};
					}
					return {
						...item,
						choice: value,
					};
				});
				if (element !== questionList) {
					return element;
				}
				const newOptionAnswers = returnItems.map((i) => i.choice);
				const newFilterOptionAnswers = newOptionAnswers.filter(String);
				const newCorrectAnswerObject = returnItems.filter(
					(item) => item.correctedAnswer === true,
				);
				const newCorrectAnswer = newCorrectAnswerObject.map((i) => i.choice);
				return {
					...element,
					answerOptions: returnItems,
					choices: newFilterOptionAnswers,
					correctAnswer: newCorrectAnswer,
				};
			}),
		);
	};
	const handleDeleteThis = (index) => {
		const isEnoughOptions = answerOptions.length > 2;
		if (!isEnoughOptions) {
			dispatch(
				loadNotification({
					message: 'Multiple selection requires at least two options',
					type: 'error',
					visible: true,
				}),
			);
			return false;
		}
		const isCorrectAnswer = answerOptions[index]?.correctedAnswer;
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				if (element !== questionList) {
					return element;
				}
				if (isCorrectAnswer) {
					correctAnswer.splice(0);
				}
				answerOptions.splice(index, 1);
				const newChoices = answerOptions.map((i) => i.choice).filter(String);
				return {
					...element,
					answerOptions: [...answerOptions],
					choices: [...newChoices],
					correctAnswer: [...correctAnswer],
				};
			}),
		);
		return true;
	};
	const handleCorrectChange = (index, value) => {
		const newCorrectAnswer = [];
		setQuestionLists((prevQuestionLists) =>
			prevQuestionLists.map((element) => {
				const returnItems = element.answerOptions.map((item, i) => {
					if (index !== i) {
						return item;
					}
					return {
						...item,
						correctedAnswer: value,
					};
				});
				if (element !== questionList) {
					return element;
				}
				returnItems.forEach((item) => {
					if (item.correctedAnswer === true) {
						newCorrectAnswer.push(item.choice);
					}
				});
				const questionType =
					newCorrectAnswer.length === 1 ? 'single selection' : 'multi choice';
				return {
					...element,
					answerOptions: returnItems,
					correctAnswer: newCorrectAnswer,
					type: questionType,
				};
			}),
		);
	};

	return (
		(collapse && status === 'update') || (
			<form className={classes.MultipleChoiceContainer}>
				<div className={classes.delBtn}>
					<DeleteIcon
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						style={{
							fontSize: 20,
							color: '#CECECE',
							border: 'none',
							background: '#f3f3f3',
							cursor: 'pointer',
							width: '5%',
						}}
					/>
				</div>
				<TextField
					error={!!(error && error.find((item) => item.path[0] === 'title'))}
					label="Question Body"
					multiline
					placeholder="Type question here"
					variant="filled"
					InputProps={{
						classes: { notchedOutline: muiClasses.noBorder },
					}}
					className={classes.typeQuestion}
					id="question"
					name="question"
					value={questionList.title}
					disabled={disable}
					onChange={(event) => {
						handleQuestionChange(event.target.value);
					}}
				/>
				{type === renderFillInBlank ? (
					<FillInBlank
						disable={disable}
						handleChangeQA={(e) => handleChangeQA(e.target.value)}
						questionList={questionList}
					/>
				) : (
					<div className={classes.answerCard}>
						<ul>
							{answerOptions &&
								answerOptions.map((answerOption, index) => (
									<CreateMultipleChoice
										disable={disable}
										type={type}
										answerOptions={answerOptions}
										handleChangeOptionAnswer={handleChangeOptionAnswer}
										handleCorrectChange={handleCorrectChange}
										handleDeleteThis={handleDeleteThis}
										answerOption={answerOption}
										correctAnswer={correctAnswer}
										choices={choices}
										key={answerOption.id}
										setQuestionLists={setQuestionLists}
										index={index}
									/>
								))}
							<li
								className={`${
									answerOptions?.length < 8 ? classes.open : classes.close
								}`}
							>
								<button
									type="button"
									onClick={handleAddOptions}
									disabled={disable}
								>
									+
								</button>
								<span>Add Options</span>
							</li>
						</ul>
					</div>
				)}
				<Button
					variant="contained"
					className={classes.btnSave}
					type="submit"
					onClick={status === answerFormStatus.UPDATE ? handleEdit : handleSave}
				>
					{status === answerFormStatus.UPDATE
						? answerFormStatus.UPDATE
						: answerFormStatus.SAVE}
				</Button>
			</form>
		)
	);
}

export default QuestionAnswerForm;
