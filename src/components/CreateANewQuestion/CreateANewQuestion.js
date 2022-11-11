import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classes from './CreateANewQuestion.module.scss';

function CreateNewQuestion() {
	return (
		<div className={classes.questions__container}>
			<div className={classes.questions__content}>
				<span className={classes.plus}>+</span>
				<Link className="link" to="/admin/manage-question/create-question">
					<Button>Multiple Choice</Button>
				</Link>
				<Link className="link" to="/admin/manage-question/create-question">
					<Button className={classes.btn__yellow}>Fill In Blank</Button>
				</Link>
			</div>
		</div>
	);
}

export default CreateNewQuestion;
