import React, { useEffect, useState } from 'react';

function CountDownTimer({ hoursMinSecs, handleFinish, timeLimit }) {
	const { hours, minutes, seconds } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

	const tick = () => {
		if (hrs === 0 && mins === 0 && secs === 0) handleFinish();
		else if (mins === 0 && secs === 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs === 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	};

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	});

	return timeLimit ? (
		<p>{`${hrs.toString().padStart(2, '0')} : ${mins
			.toString()
			.padStart(2, '0')} : ${secs.toString().padStart(2, '0')} LEFT`}</p>
	) : null;
}

export default CountDownTimer;
