import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getQuizCover } from '../../api/quizApi';
import quizCardBackgroundImg from '../../assets/quizCardBackgroundImg.png';
import { loadNotification } from '../../features/notification/notificationSlice';
import classes from './MyQuizCard.module.scss';

function MyQuizCard() {
	const userQuiz = useSelector((state) => state.quiz.userQuizzes);
	const [imageUrl, setImageUrl] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if (userQuiz) {
			Promise.all(userQuiz.map((item) => getQuizCover(item._id)))
				.then((res) => {
					setImageUrl(res.map((result) => result.data.imageUrl));
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
		<div className={classes.QuizCard}>
			<header>My Quiz</header>
			<ul>
				{userQuiz.map((item, index) => {
					const { _id } = item;
					return (
						<li key={_id}>
							<button
								className={classes.copyBtn}
								type="button"
								onClick={copied}
							>
								<ContentCopyIcon
									onClick={() =>
										navigator.clipboard.writeText(item.referralCode?.code)
									}
									sx={{ fontSize: 10 }}
								/>
							</button>
							<NavLink
								to={`/admin/quiz-detail/${item._id}`}
								className={classes.link}
							/>
							<div
								className={classes.quiz_img}
								style={{
									backgroundImage: imageUrl
										? `url(${imageUrl[index]})`
										: `url(${quizCardBackgroundImg})`,
								}}
							/>
							<footer>
								<div className={classes.cardFooter_left}>
									<p className={classes.questions}>
										{item.questions.length} Questions
									</p>
									<span>{item.name}</span>
									<p className={classes.joinCode}>
										Join Code:{'  '}
										{item.referralCode?.code}
									</p>
								</div>
								<div className={classes.cardFooter_right}>
									<p className={classes.cardPlayQuantity}>
										{item.played?.length} Plays
									</p>
									<p className={classes.created}>
										Created:{'  '} {new Date(item.date).getDate()} {'  '}
										{new Date(item.date).toLocaleString('default', {
											month: 'short',
										})}
										{'  '}
										{new Date(item.date).getFullYear()}
									</p>
								</div>
							</footer>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MyQuizCard;
