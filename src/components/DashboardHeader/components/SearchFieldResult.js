import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../Loading/Loading';
import classes from './SearchField.module.scss';

export default function SearchFieldResult({ searchInput, quizId }) {
	const quiz = useSelector((state) => state.quiz.quizzes);
	const loading = useSelector((state) => state.quiz.loading);
	const success = useSelector((state) => state.quiz.success);

	const [questionsByQuizId] = quiz.filter((item) => item._id === quizId);
	const resultList = quizId ? questionsByQuizId.questions : quiz;

	if (loading) {
		return (
			<div className={classes.SearchFieldResult__Background}>
				<Loading />
			</div>
		);
	}

	if (!success) {
		return (
			<div className={classes.SearchFieldResult__Background}>
				<p>failed to load data</p>
			</div>
		);
	}
	return (
		<div className={classes.SearchFieldResult__Background}>
			<ul>
				{searchInput
					? resultList
							.filter(({ name, title }) =>
								name
									? name.toLowerCase().includes(searchInput.toLowerCase())
									: title.toLowerCase().includes(searchInput.toLowerCase()),
							)
							.map(({ name, _id, title }) =>
								name ? (
									<Link to={`/admin/quiz-detail/${_id}`}>
										<li key={_id}>{name}</li>
									</Link>
								) : (
									<li key={_id}>{title}</li>
								),
							)
					: resultList.map(({ name, _id, title }) =>
							name ? (
								<Link to={`/admin/quiz-detail/${_id}`}>
									<li key={_id}>{name}</li>
								</Link>
							) : (
								<li key={_id}>{title}</li>
							),
					  )}
			</ul>
		</div>
	);
}
