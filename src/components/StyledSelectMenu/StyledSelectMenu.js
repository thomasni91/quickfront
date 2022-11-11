import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import classes from './StyledSelectMenu.module.scss';

const useStyles = makeStyles({
	filledInput: {
		borderBottom: '2px solid #f1f1f1',
		'& .MuiFilledInput-root': {
			width: '100%',
		},
		'& .MuiFilledInput-root .Mui-focused': {
			borderBottom: '2px solid #fcc822',
		},
		'& .MuiFilledInput-root:after': {
			borderBottom: '2px solid #fcc822!important',
		},
	},
});

function StyledSelectMenu({ title, value, onChange, options, error }) {
	const muiClasses = useStyles();
	return (
		<div className={classes.container}>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': {
						m: 1,
						width: '100%',
						margin: 0,
						fontFamily: 'inherit',
					},
				}}
				noValidate
			>
				<TextField
					className={muiClasses.filledInput}
					select
					name={title}
					label={title}
					value={value}
					onChange={onChange}
					error={error}
					variant="filled"
				>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</Box>
		</div>
	);
}

StyledSelectMenu.defaultProps = {
	error: false,
	title: '',
	value: '',
	onChange: () => {},
	options: '',
};

StyledSelectMenu.propTypes = {
	error: PropTypes.bool,
	title: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	options: PropTypes.array,
};

export default StyledSelectMenu;
