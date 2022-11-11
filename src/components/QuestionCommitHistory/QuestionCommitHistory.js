import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { useSelector } from 'react-redux';
import classes from './QuestionCommitHistory.module.scss';
import Loading from '../Loading/Loading';

export default function QuestionCommitHistory() {
	const answers = useSelector((state) => state.answer);
	const { loading, answerHistory } = answers;
	const currentYear = new Date().getFullYear();
	const startTime = `${currentYear}-01-01`;
	const endTime = `${currentYear}-12-31`;
	const { totalAnswers, data } = answerHistory;

	return (
		<div className={classes.commit__container}>
			{loading ? (
				<Loading />
			) : (
				<>
					<p className={classes.commit__title}>
						Answer {totalAnswers} questions in {currentYear}
					</p>
					{data && (
						<MyResponsiveCalendar
							data={data}
							startTime={startTime}
							endTime={endTime}
						/>
					)}
				</>
			)}
		</div>
	);
}
function MyResponsiveCalendar({ data, startTime, endTime }) {
	return (
		<ResponsiveCalendar
			theme={{ fontSize: 15 }}
			data={data}
			from={startTime}
			to={endTime}
			emptyColor="#eeeeee"
			colors={['#FEEEBC', '#FCD864', '#fcc822', '#C9A01B']}
			margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
			yearSpacing={0}
			yearLegendOffset={0}
			monthBorderColor="#ffffff"
			dayBorderWidth={2}
			dayBorderColor="#ffffff"
			align="top"
			width={1200}
			height={200}
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'row',
					translateY: 36,
					itemCount: 4,
					itemWidth: 42,
					itemHeight: 36,
					itemsSpacing: 14,
					itemDirection: 'right-to-left',
				},
			]}
		/>
	);
}
