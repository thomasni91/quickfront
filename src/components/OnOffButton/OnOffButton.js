import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clock from '../../assets/clock.png';
import classes from './OnOffButton.module.scss';
import { setTimer } from '../../features/answer/answerSlice';

function OnOffButton() {
	const dispatch = useDispatch();

	const [isStart, setIsStart] = useState(false);

	const handleClickTimer = () => {
		setIsStart(!isStart);
	};

	useEffect(() => {
		dispatch(setTimer(isStart));
	}, [isStart]);

	return (
		<div className={classes.fragment}>
			<button
				type="button"
				className={classes.container}
				onClick={handleClickTimer}
			>
				<div className={`${!isStart ? classes.white : classes.right}`}>
					<div className={`${!isStart ? classes.gray : classes.yellow}`}>
						<img className={classes.OnOffButton} src={clock} alt="clock" />
					</div>
				</div>
			</button>
		</div>
	);
}

export default OnOffButton;
