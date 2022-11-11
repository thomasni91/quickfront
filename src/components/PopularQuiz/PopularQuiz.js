import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuizList from '../QuizList/QuizList';
import { filterPopularQuizType } from '../../features/quiz/quizSlice';
import classes from './PopularQuiz.module.scss';

function PopularQuiz() {
	const dispatch = useDispatch();
	const { name, id: filters } = useParams();
	useEffect(() => {
		dispatch(filterPopularQuizType(filters));
	}, []);
	return (
		<div className={classes.PopularQuiz__container}>
			<h1>{name}</h1>
			<QuizList />
		</div>
	);
}

export default PopularQuiz;
