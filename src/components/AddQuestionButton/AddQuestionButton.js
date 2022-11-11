import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import classes from './AddQuestionButton.module.scss';

function AddQuestionButton({ handleAddQuestionType, questionLists }) {
	const buttonDisabled = useSelector((state) => state.question.buttonDisabled);

	return (
		<div className={classes.questions__container}>
			<div className={classes.questions__content}>
				<span className={classes.plus}>+</span>
				<Button
					disabled={questionLists.length === 0 ? false : buttonDisabled}
					onClick={() => handleAddQuestionType('multi choice')}
				>
					Multiple Choice
				</Button>
				<Button
					disabled={buttonDisabled}
					className={classes.btn__yellow}
					onClick={() => {
						handleAddQuestionType('fill-in-blank');
					}}
				>
					Fill In Blank
				</Button>
			</div>
		</div>
	);
}

export default AddQuestionButton;
