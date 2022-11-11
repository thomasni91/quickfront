import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import classes from './QuizDetailCard.module.scss';
import Pencil from '../../assets/Pencil.png';
import quizCardBackgroundImg from '../../assets/quizCardBackgroundImg.png';
import Delete from '../../assets/delete.png';
import {
	deleteQuizByID,
	deleteQuizInQuizzes,
} from '../../features/quiz/quizSlice';
import { loadNotification } from '../../features/notification/notificationSlice';
import AlertDialog from '../AlertDialog/AlertDialog';

function QuizDetailCard({
	joinCode,
	createdAt,
	title,
	questionNumer,
	playTimes,
	difficulty,
	id,
	status,
	link,
	imageUrl,
}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const success = useSelector((state) => state.quiz.success);
	const [open, setOpen] = useState(false);
	// Open delete account dialog
	const handleClickOpen = () => {
		setOpen(true);
	};
	const deleteProps = {
		alertTitle: 'Quiz Delete',
		alertMsg: 'Are you sure you want to delete?',
		// Close dialog
		handleClose: () => {
			setOpen(false);
		},
		// Delete action
		handleClickDelete: async () => {
			await dispatch(deleteQuizByID({ id }));
			if (success) {
				dispatch(
					loadNotification({
						message: ' This quiz is deleted successfully',
						type: 'success',
						visible: true,
					}),
				);
				dispatch(deleteQuizInQuizzes(id));
			}
		},
	};

	const handleEdit = () => {
		navigate(`/admin/quiz-edit/${id}`);
	};

	const copied = () => {
		dispatch(
			loadNotification({
				message: 'Copied!',
				type: 'success',
				visible: true,
			}),
		);
	};
	return (
		<div className={classes.quizDetailCard__container}>
			<div
				className={classes.quizDetailCard__image}
				style={{
					backgroundImage: imageUrl
						? `url(${imageUrl})`
						: `url(${quizCardBackgroundImg})`,
				}}
			>
				{status === 'my-quiz' && (
					<div className={classes.quizDetailCard__buttons}>
						<button type="button" onClick={handleEdit}>
							<img
								className={classes.quizDetailCard__edit}
								src={Pencil}
								alt="edit"
							/>
						</button>
						<Button
							className={classes.quizDetailCard__button}
							onClick={handleClickOpen}
							style={{
								width: '30px',
								minWidth: '30px',
								background: 'white',
							}}
						>
							<img
								className={classes.quizDetailCard__edit}
								src={Delete}
								alt="edit"
							/>
						</Button>
						<AlertDialog open={open} dialogProps={deleteProps} />
					</div>
				)}
			</div>
			{status === 'my-quiz' ? (
				<button className={classes.copyBtn} type="button" onClick={copied}>
					<ContentCopyIcon
						onClick={() => navigator.clipboard.writeText(joinCode)}
						sx={{ fontSize: 12 }}
					/>
				</button>
			) : (
				''
			)}
			<NavLink to={link} className={classes.link}>
				<div className={classes.quizDetailCard__content}>
					{status === 'my-quiz' ? (
						<section className={classes.quizDetailCard__labelGroup}>
							<label>{questionNumer} Questions</label>
							<label>{playTimes} Plays</label>
						</section>
					) : (
						<section className={classes.quizDetailCard__labelGroup} />
					)}
					<p className={classes.quizDetailCard__title}>{title}</p>
					{status === 'my-quiz' ? (
						<section>
							<p>Join Code: {joinCode}</p>
							<p>Created: {createdAt}</p>
						</section>
					) : (
						<section>
							<p>Difficulty: {difficulty}</p>
							<p>Submit time: {createdAt}</p>
						</section>
					)}
				</div>
			</NavLink>
		</div>
	);
}

export default QuizDetailCard;
