import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';
import classes from './Setting.module.scss';
import SettingDisplay from '../../components/SettingDisplay/SettingDisplay';

export default function Setting() {
	const dispatch = useDispatch();
	const location = useLocation();
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);
	return (
		<>
			<div className={classes.setting__background}> </div>
			<h2 className={classes.setting}>Setting</h2>
			<SettingDisplay />
		</>
	);
}
