import React from 'react';
import { useSelector } from 'react-redux';
import dateFormatter from '../../utils/dateFormatter';
import classes from './SettingDisplay.module.scss';

export default function SettingDescription() {
	const quiz = useSelector((state) => state.quiz.userQuizzes);
	const createdAt = useSelector((state) => state.login.createdAt);

	return (
		<div className={classes.setting__user__info}>
			<p className={classes.setting__user__container}>
				<span className={classes.setting__information__title}>
					Register Date:
				</span>
				<span className={classes.setting__information__description}>
					{createdAt ? dateFormatter(createdAt) : 'Not applicable data'}
				</span>
			</p>
			<p className={classes.setting__user__container}>
				<span className={classes.setting__information__title}>Total Quiz:</span>
				<span className={classes.setting__information__description}>
					{quiz.length}
				</span>
			</p>
			<p className={classes.setting__user__container}>
				<span className={classes.setting__information__title}>
					Highest Score:
				</span>
				<span className={classes.setting__information__description}>100</span>
			</p>
		</div>
	);
}
