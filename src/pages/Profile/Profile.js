import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';
import classes from './Profile.module.scss';

export default function Profile() {
	const dispatch = useDispatch();
	const location = useLocation();
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);
	return <h1 className={classes.title}>Profile page coming soon</h1>;
}
