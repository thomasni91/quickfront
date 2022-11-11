import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuizCover } from '../../api/quizApi';
import signupPhoto from '../../assets/Signup-hero.png';
import { loadNotification } from '../../features/notification/notificationSlice';
import classes from './QuizList.module.scss';

function QuizCard({ quizId, name, description, questionNumber, timeLimit }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [imageUrl, setImageUrl] = useState('');
	useEffect(() => {
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
	}, []);
	return (
		<div
			className={classes.quizCard}
			onClick={() => {
				navigate(`/admin/quiz-detail/${quizId}`);
			}}
		>
			<img
				src={imageUrl || signupPhoto}
				alt="Signup-hero"
				className={classes.quizCard__image}
			/>
			<div className={classes.quizCard__content}>
				<h2>{name}</h2>
				<p className={classes.quizCard__description}>
					{description ? `${description.slice(0, 100)} ...` : 'No Description'}
				</p>
				<div className={classes.quizCard__info__container}>
					<span className={classes.quizCard__info}>
						{questionNumber ? `${questionNumber} Qs` : 'No Question'}
					</span>
					<span className={classes.quizCard__info}>
						{timeLimit ? `${timeLimit} mins` : 'No Time Limit'}
					</span>
				</div>
			</div>
		</div>
	);
}

export default QuizCard;
