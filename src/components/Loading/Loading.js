import React from 'react';
import { CircularProgress } from '@mui/material';
import classes from './Loading.module.scss';

export default function Loading() {
	return (
		<div className={classes.loading}>
			<CircularProgress style={{ color: 'grey' }} />
		</div>
	);
}
