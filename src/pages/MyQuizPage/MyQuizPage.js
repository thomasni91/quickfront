import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import { addPagePath } from '../../features/page/pageSlice';
import { getQuizByUser } from '../../features/quiz/quizSlice';
import classes from './MyQuizPage.module.scss';
import listIcon from '../../assets/list.svg';
import cardIcon from '../../assets/card.svg';
import MyQuizCardView from '../../components/MyQuizCardView/MyQuizCardView';
import MyQuizListView from '../../components/MyQuizListView/MyQuizListView';

function MyQuizPage() {
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz);
	const location = useLocation();
	const { userQuizzes, loading } = quiz;

	useEffect(() => {
		dispatch(getQuizByUser());
	}, []);

	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);

	const [status, setStatus] = useState('card');
	const MyQuizOptions = [
		{ label: 'list', icon: listIcon, alt: 'list' },
		{ label: 'card', icon: cardIcon, alt: 'card' },
	];

	return (
		<div className={classes.myQuiz__container}>
			{userQuizzes.length !== 0 && (
				<div className={classes.myQuiz__switchBtn}>
					<SwitchBtn
						options={MyQuizOptions}
						status={status}
						setStatus={setStatus}
					/>
				</div>
			)}
			{loading ? (
				<div className={classes.myQuiz__loading}>
					<Loading />
				</div>
			) : (
				(status === 'card' && (
					<MyQuizCardView uploadedQuizData={userQuizzes} />
				)) || <MyQuizListView uploadedQuizData={userQuizzes} />
			)}
		</div>
	);
}

export default MyQuizPage;
