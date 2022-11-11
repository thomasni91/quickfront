import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import classes from './CreateQuizBtn.module.scss';

function CreateQuizBtn() {
	return (
		<div className={classes.createQuiz}>
			<Link to="create-quiz">
				<Button type="button" className={classes.createQuizBtn}>
					Create Quiz
				</Button>
			</Link>
		</div>
	);
}

export default CreateQuizBtn;
