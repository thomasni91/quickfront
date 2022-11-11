import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './MyQuizCardView.module.scss';
import { setUploadedShowMore } from '../../features/myQuiz/myQuizSlice';
import QuizDetailCard from '../QuizDetailCard/QuizDetailCard';
import { loadNotification } from '../../features/notification/notificationSlice';
import { getQuizCover } from '../../api/quizApi';
import EmptyPage from '../EmptyPage/EmptyPage';

function MyQuizCardView({ uploadedQuizData }) {
	const uploadedShowMore = useSelector(
		(state) => state.myQuiz.uploadedShowMore,
	);
	const [imageUrl, setImageUrl] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if (uploadedQuizData) {
			Promise.all(uploadedQuizData.map((item) => getQuizCover(item._id)))
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
	const formatDate = (date) => {
		const day = new Date(date).getDate();
		const month = new Date(date).toLocaleString('default', { month: 'short' });
		const year = new Date(date).getFullYear();
		return `${day} ${month} ${year}`;
	};
	return uploadedQuizData?.length === 0 ? (
		<EmptyPage>
			<h2>Hi, Branincell! Welcome to Quick Learner</h2>
			<h3>
				<p>It looks like your quiz page is empty.</p>
				<p>Start creating your first quiz!</p>
			</h3>
		</EmptyPage>
	) : (
		<div className={classes.myQuiz__content}>
			{uploadedQuizData.length !== 0 && (
				<div className={classes.myQuiz__contentTitle}>
					<h3 className={classes.myQuiz__title}>Published</h3>
					<p onClick={() => dispatch(setUploadedShowMore())}>
						{uploadedShowMore ? 'SHOW LESS' : 'SHOW MORE'}
					</p>
				</div>
			)}
			<div
				className={[
					classes.myQuiz__cardContainer,
					classes.myQuiz__uploaded,
				].join(' ')}
				style={uploadedShowMore ? { height: 'auto' } : { height: '300px' }}
			>
				{uploadedQuizData.map((item, index) => (
					<QuizDetailCard
						key={`uploaded-${item._id}`}
						createdAt={formatDate(item.date)}
						joinCode={item.referralCode ? item.referralCode.code : ''}
						title={item.name}
						questionNumer={item.questions.length}
						playTimes={item.played.length}
						id={item._id}
						imageUrl={imageUrl[index]}
						link={`/admin/quiz-detail/${item._id}`}
						status="my-quiz"
					/>
				))}
				{uploadedQuizData.map((item) => (
					<i key={`uploaded-${item._id}`} />
				))}
			</div>
		</div>
	);
}

export default MyQuizCardView;
