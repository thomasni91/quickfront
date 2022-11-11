import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles(() => ({
	noBorder: {
		border: 'none !important',
	},
}));

function CreateMultipleChoice({
	handleChangeOptionAnswer,
	handleCorrectChange,
	handleDeleteThis,
	answerOption,
	index,
	correctAnswer,
	choices,
	disable,
}) {
	const muiClasses = useStyles();

	return (
		<li style={{ background: '#F3F3F3' }}>
			<span
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
				}}
			>
				<FormControlLabel
					control={
						<Checkbox
							sx={{ color: 'grey', '&.Mui-checked': { color: '#fcc924' } }}
							disabled={
								answerOption.choice === '' ||
								(correctAnswer.length + 1 >= choices.length &&
									answerOption.correctedAnswer === false) ||
								disable
							}
							onChange={(event) =>
								handleCorrectChange(index, event.target.checked)
							}
							checked={answerOption.correctedAnswer}
							icon={<RadioButtonUncheckedIcon />}
							checkedIcon={<CheckCircleIcon />}
						/>
					}
				/>
				<DeleteIcon
					onClick={(e) => {
						e.preventDefault();
						handleDeleteThis(index);
					}}
					style={{
						fontSize: 20,
						color: '#CECECE',
						border: 'none',
						background: '#f3f3f3',
						cursor: 'pointer',
					}}
				/>
			</span>
			<TextField
				placeholder="Type answer option here "
				InputProps={{
					classes: { notchedOutline: muiClasses.noBorder },
				}}
				onChange={(event) =>
					handleChangeOptionAnswer(index, event.target.value)
				}
				id="answer"
				name="answer"
				value={answerOption.choice}
				disabled={disable}
			/>
		</li>
	);
}

export default CreateMultipleChoice;
