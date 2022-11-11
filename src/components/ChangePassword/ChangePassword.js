import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../features/user/userSlice';
import classes from './ChangePassword.module.scss';
import changePasswordSchema from '../../validation/changePasswordValidation';

export default function ChangePassword() {
	const dispatch = useDispatch();
	const { user: email, token } = useSelector((state) => state.login);
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState(null);
	const handleChangeOldPassword = (e) => setOldPassword(e);
	const handleChangePassword = (e) => setPassword(e);
	const handleChangeConfirmPassword = (e) => setConfirmPassword(e);

	const setPasswordStatus = {
		PASSWORD: 'password',
		OLD_PASSWORD: 'oldPassword',
		CONFIRM_PASSWORD: 'confirmPassword',
	};

	const handleSubmitChangePassword = (e) => {
		e.preventDefault();
		const result = changePasswordSchema.validate(
			{ password, confirmPassword, oldPassword },
			{
				abortEarly: false,
			},
		);
		if (!result.error) {
			dispatch(changePassword({ token, email, oldPassword, password }));
			setPassword('');
			setConfirmPassword('');
			setOldPassword('');
			setError(null);
		} else {
			setError(result.error.details);
		}
	};
	const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
	const handleMouseDownOldPassword = () => setShowOldPassword(!showOldPassword);
	const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
	const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword);
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);
	const handleMouseDownConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);
	return (
		<section className={classes.changePassword}>
			<h3>Reset Password</h3>
			<label>Old Password</label>
			<p className={classes.detail}>
				Your password must be at least six characters and cannot contain space
				or match your email address
			</p>
			<TextField
				value={oldPassword}
				error={
					!!(
						error &&
						error.find(
							(item) => item.path[0] === setPasswordStatus.OLD_PASSWORD,
						)
					)
				}
				className={classes.typePassword}
				type={showOldPassword ? 'text' : 'password'}
				onChange={(e) => {
					handleChangeOldPassword(e.target.value);
				}}
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowOldPassword}
								onMouseDown={handleMouseDownOldPassword}
							>
								{showOldPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<label>New Password</label>
			{error ? <span>{error[0].message}</span> : null}
			<TextField
				error={
					!!(
						error &&
						error.find((item) => item.path[0] === setPasswordStatus.PASSWORD)
					)
				}
				value={password}
				className={classes.typePassword}
				type={showNewPassword ? 'text' : 'password'}
				onChange={(e) => {
					handleChangePassword(e.target.value);
				}}
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowNewPassword}
								onMouseDown={handleMouseDownNewPassword}
							>
								{showNewPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<label>Confirm New Password</label>
			<TextField
				className={classes.typePassword}
				error={
					!!(
						error &&
						error.find(
							(item) => item.path[0] === setPasswordStatus.CONFIRM_PASSWORD,
						)
					)
				}
				value={confirmPassword}
				type={showConfirmPassword ? 'text' : 'password'}
				required
				onChange={(e) => {
					handleChangeConfirmPassword(e.target.value);
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowConfirmPassword}
								onMouseDown={handleMouseDownConfirmPassword}
							>
								{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<button
				type="button"
				className={classes.reset__button}
				onClick={handleSubmitChangePassword}
			>
				Reset Password
			</button>
		</section>
	);
}
