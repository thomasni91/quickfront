import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classes from './MultipleChoice.module.scss';
import EmptyQuestionPageLogo from '../../assets/Group.png';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
import QuestionAnswerForm from './QuestionAnswerForm';
import {
	changeDisabledButton,
	deleteQuestionFromQuiz,
} from '../../features/question/questionSlice';
import { loadNotification } from '../../features/notification/notificationSlice';
import { addPagePath } from '../../features/page/pageSlice';

function MultipleChoiceQuestion() {
	const [questionLists, setQuestionLists] = useState([]);
	const [questionStatus, setQuestionStatus] = useState([]);
	const buttonDisabled = useSelector((state) => state.question.buttonDisabled);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [collapse, setCollapse] = useState(false);
	const quizInfo = useSelector((state) => state.quiz.currentQuiz);

	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);

	useEffect(() => {
		const status = [];
		if (location.pathname.includes('/quiz-edit') && quizInfo) {
			for (let i = 0; i < quizInfo.questions.length; i += 1) {
				status.push('update');
			}
			setQuestionLists(quizInfo.questions);
			setQuestionStatus(status);
		}
	}, [quizInfo]);
	const handleAddQuestionType = (data) => {
		const status = [];
		dispatch(changeDisabledButton(true));
		setQuestionLists((prevQuestionList) => [
			...prevQuestionList,
			{
				id: nanoid(),
				title: '',
				choices: [],
				correctAnswer: [],
				type: data,
				answerOptions: [
					{ id: nanoid(), correctedAnswer: false, choice: '' },
					{ id: nanoid(), correctedAnswer: false, choice: '' },
					{ id: nanoid(), correctedAnswer: false, choice: '' },
				],
			},
		]);
		status.push('create');
		setQuestionStatus((prevStatus) => [...prevStatus, ...status]);
	};

	const handleUpload = () => {
		navigate('/admin/my-quiz');
	};

	const handleDeleteAll = () => {
		dispatch(changeDisabledButton(false));
		setQuestionLists([]);
		setQuestionStatus([]);
		const data = {
			creator: quizInfo.creator,
		};
		if (questionLists) {
			try {
				questionLists.forEach((questionList) => {
					dispatch(
						deleteQuestionFromQuiz({
							questionId: questionList._id,
							data,
						}),
					);
				});
				dispatch(
					loadNotification({
						message: 'Questions deleted',
						type: 'success',
						visible: true,
					}),
				);
			} catch {
				dispatch(
					loadNotification({
						message: 'Questions delete failed',
						type: 'error',
						visible: true,
					}),
				);
			}
		}
	};

	return (
		<main className={classes.questionContent}>
			<AddQuestionButton
				handleAddQuestionType={handleAddQuestionType}
				questionLists={questionLists}
			/>
			{questionLists.length === 0 ? (
				<section className={classes.emptyQuestion_section}>
					<div className={classes.emptyPageLogo}>
						<img src={EmptyQuestionPageLogo} alt="emptyPageLogo" />
					</div>
					<p className={classes.emptyPage_notification}>
						Click the button to add your first question
					</p>
				</section>
			) : (
				<>
					{location.pathname.includes('/quiz-edit') && (
						<button
							type="submit"
							onClick={() => setCollapse(!collapse)}
							className={classes.collapse}
						>
							{collapse ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
							{collapse ? 'Show all questions' : 'Collapse existed questions'}
						</button>
					)}
					<div className={classes.formOrder}>
						{questionLists.map((questionList, index) => (
							<QuestionAnswerForm
								questionList={questionList}
								indexes={index}
								status={questionStatus[index]}
								key={questionList.id}
								setQuestionLists={setQuestionLists}
								setQuestionStatus={setQuestionStatus}
								collapse={collapse}
							/>
						))}
					</div>
					<div className={classes.btnFooter}>
						<Button
							disabled={buttonDisabled}
							variant="contained"
							className={classes.btnUpload}
							onClick={handleUpload}
						>
							Publish
						</Button>

						<Button
							variant="contained"
							className={classes.btnCancel}
							onClick={handleDeleteAll}
						>
							Delete All
						</Button>
					</div>
				</>
			)}
		</main>
	);
}

export default MultipleChoiceQuestion;
