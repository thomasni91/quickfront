import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { FilledInput, FormControl, InputLabel } from '@mui/material';

const useStyles = makeStyles({
	filledPasswordInput: {
		width: '100%',
		borderBottom: '2px solid #f1f1f1',
		'&.Mui-focused': {
			borderBottom: '2px solid #fcc822',
		},
		'&:after': {
			borderBottom: '2px solid #fcc822!important',
		},
	},
});

function StyledTextInput({
	title,
	onChange,
	value,
	type,
	autoFocus,
	inputProps,
	endAdornment,
	startAdornment,
	error,
}) {
	const muiClasses = useStyles();
	const randomId = `${title}-${Math.random() * 10}`;
	return (
		<FormControl
			error={error}
			sx={{ width: '100%', margin: '10px 0' }}
			variant="filled"
		>
			<InputLabel className={muiClasses.inputLabel} htmlFor={randomId}>
				{title}
			</InputLabel>
			<FilledInput
				type={type}
				onChange={onChange}
				value={value}
				autoFocus={autoFocus}
				inputProps={inputProps}
				endAdornment={endAdornment}
				startAdornment={startAdornment}
				className={muiClasses.filledPasswordInput}
				id={randomId}
			/>
		</FormControl>
	);
}

StyledTextInput.defaultProps = {
	error: false,
	title: '',
	type: '',
	onChange: () => {},
	value: '',
	autoFocus: false,
	inputProps: {},
	endAdornment: null,
	startAdornment: null,
};

StyledTextInput.propTypes = {
	error: PropTypes.bool,
	title: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	autoFocus: PropTypes.bool,
	inputProps: PropTypes.shape({ autoComplete: PropTypes.string }),
	endAdornment: PropTypes.node,
	startAdornment: PropTypes.node,
};

export default StyledTextInput;
