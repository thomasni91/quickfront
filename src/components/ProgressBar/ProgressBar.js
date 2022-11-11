import React from 'react';
import PropTypes from 'prop-types';
import classes from './ProgressBar.module.scss';

function ProgressBar({ completedNum, totalNum, width }) {
	const progress = completedNum / totalNum;
	return (
		<div className={classes.progressBar__container} style={{ width }}>
			<div className={classes.progressBar__track}>
				<div
					className={classes.progressBar__bar}
					style={{ width: `${(progress * 100).toFixed()}%` }}
				/>
			</div>
			<p className={classes.progressBar__percentage}>{`${(
				progress * 100
			).toFixed()}%`}</p>
		</div>
	);
}

ProgressBar.defaultProps = {
	completedNum: 0,
	totalNum: 0,
	width: '',
};

ProgressBar.propTypes = {
	completedNum: PropTypes.number,
	totalNum: PropTypes.number,
	width: PropTypes.string,
};

export default ProgressBar;
