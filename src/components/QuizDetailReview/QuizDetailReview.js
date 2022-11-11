import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import OnOffButton from '../OnOffButton/OnOffButton';
import Question, { modeType } from '../Question/Question';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import classes from './QuizDetailReview.module.scss';
import QuizNoQuestion from '../../assets/quiz-no-question.png';
import quizCardBackgroundImg from '../../assets/quizCardBackgroundImg.png';
import { getQuizCover } from '../../api/quizApi';
import { loadNotification } from '../../features/notification/notificationSlice';

function QuizDetailReview() {
	// fetch quiz detail data from redux state
	const { quizId } = useParams();
	const [imageUrl, setImageUrl] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof quizId !== 'undefined') {
			dispatch(getQuizByInfo({ code: quizId }));
			getQuizCover(quizId)
				.then((res) => {
					setImageUrl(res.data.imageUrl);
				})
				.catch((error) => {
					dispatch(
						loadNotification({
							message: error.message,
							type: 'error',
							visible: true,
						}),
					);
				});
		}
	}, []);

	const {
		name = 'Not Available',
		questions = [],
		date = '2022-02-02',
		grade = 'Not Available',
		timeLimit = 'Not Available',
		played = '0',
	} = useSelector((state) => state.quiz.currentQuiz || {});

	const createdDate = dayjs(date).format('DD-MMM-YYYY');
	const hasQuestion = Boolean(questions.length);

	const inforList = [
		{ Created: createdDate },
		{ Grade: grade },
		{ Plays: played?.length },
		{ Time: timeLimit },
	];

	const handleStartBtn = () => {
		navigate(`/answer/${quizId}`);
	};
	const handleBackBtn = () => {
		navigate(-1);
	};

	const handleAddQuestionBtn = () => {
		navigate(`/admin/manage-question/create-question/${quizId}`);
	};

	return (
		<div className={`${classes['page-container']}`}>
			<div className={`${classes['page-content']} ${classes['d-flex']}`}>
				<div className={classes.quiz}>
					<div className={classes.quiz__header}>
						<div className={`${classes['quiz__heading-box']}`}>
							<i className={classes.quiz__icon}>
								<img
									src={imageUrl || quizCardBackgroundImg}
									alt="quiz background"
									className={classes.quiz_img}
								/>
							</i>
							<div className={classes.quiz__title}>
								<div className={classes.quiz__titleDetail}>
									<h2>{name}</h2>
									<OnOffButton />
								</div>
								<ul className={`${classes['quiz__infor-list']}`}>
									{inforList?.map((item) => (
										<li key={Object.keys(item)}>
											<small>{Object.keys(item)}:</small>
											<small>{Object.values(item)}</small>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className={`${classes['quiz__content-container']}`}>
						{!hasQuestion ? (
							<section className={`${classes['quiz__content-empty']}`}>
								<h2>
									There is no question in this quiz
									<br />
									How about...
								</h2>
								<img src={QuizNoQuestion} alt="empty question" />
								<div className={`${classes['btn-group']}`}>
									<Button onClick={handleAddQuestionBtn}>
										Create question
									</Button>
									<Button onClick={handleBackBtn}>Go Back</Button>
								</div>
							</section>
						) : (
							<section className={classes.quiz__content}>
								{questions.map((item) => (
									<Question
										key={item._id}
										question={item}
										mode={modeType.DISPLAY}
									/>
								))}
							</section>
						)}
					</div>
				</div>
				<div className={`${classes['btn-group']}`}>
					{hasQuestion && (
						<>
							<Button onClick={handleStartBtn}>Start</Button>
							<Button onClick={handleBackBtn}>Back</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default QuizDetailReview;
