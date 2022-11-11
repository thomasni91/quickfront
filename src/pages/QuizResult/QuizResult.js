import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getQuizCover } from '../../api/quizApi';
import QuizDetailCard from '../../components/QuizDetailCard/QuizDetailCard';
import { loadNotification } from '../../features/notification/notificationSlice';
import { addPagePath } from '../../features/page/pageSlice';
import { getTakeQuizByUser } from '../../features/takeQuiz/takeQuizSlice';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import classes from './QuizResult.module.scss';

function QuizResult() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [imageUrl, setImageUrl] = useState([]);
	const takeQuizList = useSelector((state) => state.takeQuiz.takeQuiz).filter(
		(item, index, self) =>
			index === self.findIndex((t) => t.quiz?._id === item.quiz?._id),
	);

	useEffect(() => {
		dispatch(getTakeQuizByUser());
		if (takeQuizList) {
			Promise.all(takeQuizList.map((item) => getQuizCover(item.quiz._id)))
				.then((res) => {
					setImageUrl(res.map((item) => item.data.imageUrl));
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

	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);

	const formatDate = (date) => {
		const day = new Date(date).getDate();
		const month = new Date(date).toLocaleString('default', { month: 'short' });
		const year = new Date(date).getFullYear();
		return `${day} ${month} ${year}`;
	};

	return takeQuizList.length === 0 ? (
		<EmptyPage>
			<h3>
				<p>It looks like your have no quiz result.</p>
				<p>Start trying your first quiz!</p>
			</h3>
		</EmptyPage>
	) : (
		<div className={classes.result__container}>
			<h3 className={classes.result__title}>Quiz Result</h3>
			<div className={classes.reult__cardContainer}>
				{takeQuizList.map((item, index) => (
					<QuizDetailCard
						key={`card-${item._id}`}
						createdAt={formatDate(item.startTime)}
						title={item.quiz?.name}
						difficulty={item.quiz?.difficulty}
						status="quiz-result"
						imageUrl={imageUrl[index]}
						link={`/admin/quiz-result/${item.quiz?._id}`}
					/>
				))}
				{takeQuizList.map((item) => (
					<i key={`uploaded-${item._id}`} />
				))}
			</div>
		</div>
	);
}

export default QuizResult;
