import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addPagePath } from '../../features/page/pageSlice';
import { fetchAllQuiz, getQuizByUser } from '../../features/quiz/quizSlice';
import { getAnswerHistoryByUserId } from '../../features/answer/answerSlice';
import QuestionCommitHistory from '../../components/QuestionCommitHistory/QuestionCommitHistory';
import SearchQuizByCode from '../../components/SearchQuizByCode/SearchQuizByCode';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import PopularCategory from '../../components/PopularCategory/PopularCategory';
import MyQuizCard from '../../components/MyQuizCard/MyQuizCard';
import classes from './HomePage.module.scss';
import RecentActivities from '../../components/RecentActivities/RecentActivities';

function HomePage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const quiz = useSelector((state) => state.quiz);
	const { userQuizzes } = quiz;
	const userName =
		useSelector((state) => state.login.name) ||
		useSelector((state) => state.login.user).split('@')[0];
	useEffect(() => {
		dispatch(fetchAllQuiz());
		dispatch(getQuizByUser());
		dispatch(getAnswerHistoryByUserId());
	}, []);

	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);

	return userQuizzes?.length === 0 ? (
		<EmptyPage hasButton>
			<h2>Hi, Branincell! Welcome to Quick Learner</h2>
			<h3>
				<p>It looks like your homepage is empty.</p>
				<p>Start creating your first quiz!</p>
			</h3>
		</EmptyPage>
	) : (
		<div className={classes.home__container}>
			<h1>Hi, {userName || 'Braincell'}! Welcome Back</h1>
			<SearchQuizByCode />
			<h2>Popular Category</h2>
			<PopularCategory />
			<MyQuizCard />
			<QuestionCommitHistory />
			<RecentActivities />
		</div>
	);
}

export default HomePage;
