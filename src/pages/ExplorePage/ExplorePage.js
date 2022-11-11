import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';

import QuizList from '../../components/QuizList/QuizList';
import QuizFilterBar from '../../components/QuizFilterBar/QuizFilterBar';
import SearchQuizByCode from '../../components/SearchQuizByCode/SearchQuizByCode';

function ExplorePage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const userName =
		useSelector((state) => state.login.name) ||
		useSelector((state) => state.login.user).split('@')[0];
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);
	return (
		<>
			<h1>Hi, {userName || 'Braincell'}! What will you learn today?</h1>
			<SearchQuizByCode />
			<QuizFilterBar />
			<QuizList />
		</>
	);
}

export default ExplorePage;
