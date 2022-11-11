import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classes from '../Question/MultipleChoice.module.scss';

const useStyles = makeStyles(() => ({
	noBorder: {
		border: 'none!important',
	},
	answerInput: {
		width: '100%',
		height: '84px',
		background: '#f4f4f4',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '9px',
	},
	input: {
		background: '#f4f4f4!important',
		fontSize: '12px!important',
		textAlign: 'center',
	},
}));
export default function FillInBlank({ handleChangeQA, disable }) {
	const muiClasses = useStyles();

	return (
		<TextField
			placeholder="Type answer here"
			InputProps={{
				classes: {
					notchedOutline: muiClasses.noBorder,
					root: muiClasses.answerInput,
					input: muiClasses.input,
				},
			}}
			className={classes.answerCard}
			onChange={handleChangeQA}
			disabled={disable}
			id="answer"
			name="answer"
		/>
	);
}
