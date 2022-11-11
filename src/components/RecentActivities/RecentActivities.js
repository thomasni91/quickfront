import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { getTakeQuizByUser } from '../../features/takeQuiz/takeQuizSlice';
import classes from './RecentActivities.module.scss';

function RecentActivities() {
	const dispatch = useDispatch();
	const takeQuiz = useSelector((state) => state.takeQuiz.takeQuiz);
	const token = useSelector((state) => state.login.token);
	useEffect(() => {
		dispatch(getTakeQuizByUser(token));
	}, []);
	if (takeQuiz.loading) {
		return <Loading />;
	}
	return (
		<div className={classes.activitiesCard}>
			<header>Recent Activity</header>
			{takeQuiz.length === 0 ? (
				<p>No Recent Activity</p>
			) : (
				<ul>
					{takeQuiz.map((item) => {
						const { _id } = item;
						return (
							<li key={_id}>
								<p className={classes.date}>
									{new Date(item.submitTime).toLocaleString('default', {
										month: 'long',
									})}
									{'  '}
									{new Date(item.submitTime).getFullYear()}
								</p>
								<main>
									<p>
										{item.quiz?.referralCode?.code || ''} {'  '}Quiz
									</p>
									<p className={classes.description}>
										Description: {item.quiz?.name || ''}
									</p>
								</main>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default RecentActivities;
