import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import classes from './ChangeUserName.module.scss';
import { changeUsername } from '../../features/user/userSlice';
import { setName } from '../../features/login/loginSlice';

function ChangeUserName() {
	const name = useSelector((state) => state.login.name);
	const email = useSelector((state) => state.login.user);
	const token = useSelector((state) => state.login.token);
	const [username, setUsername] = useState(name);
	const dispatch = useDispatch();
	const handleChangeUserName = (e) => setUsername(e);
	const handleSubmitChangeUserName = (e) => {
		e.preventDefault();
		dispatch(changeUsername({ token, username, email }));
		dispatch(setName(username));
	};
	return (
		<section className={classes.changeUserName}>
			<label>User Name</label>
			<TextField
				className={classes.typeUsername}
				id="username"
				name="username"
				value={username}
				onChange={(e) => {
					handleChangeUserName(e.target.value);
				}}
			/>
			<label>Email Address</label>
			<TextField defaultValue={email} disabled className={classes.email} />
			<button
				type="button"
				className={classes.setting__button}
				onClick={handleSubmitChangeUserName}
			>
				Save Change
			</button>
		</section>
	);
}

export default ChangeUserName;
