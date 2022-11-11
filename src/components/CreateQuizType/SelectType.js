import React from 'react';
import PropTypes from 'prop-types';
import classes from './createQuizType.module.scss';

function SelectType({ tag, selected, handleSelect }) {
	return (
		<li className={classes.selctType}>
			<button
				type="button"
				className={`${
					selected ? classes.selectedQuizTag : classes.model__quizTag
				}`}
				onClick={handleSelect}
			>
				{tag}
			</button>
			<button
				type="button"
				className={`${classes.model__quizTag} ${classes.CancelSelectedQuizTag}`}
				style={{ display: selected ? 'none' : 'none' }}
				onClick={handleSelect}
			>
				X
			</button>
		</li>
	);
}
SelectType.defaultProps = {
	tag: '',
	selected: 'false',
	handleSelect: {},
};
SelectType.propTypes = {
	tag: PropTypes.string,
	selected: PropTypes.bool,
	handleSelect: PropTypes.func,
};

export default SelectType;
