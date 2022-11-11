import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Box, Button } from '@mui/material';
import {
	signupAsync,
	resetSignupStatus,
	signupResendEmail,
} from '../../features/signup/signupSlice';
import classes from './Signup.module.scss';
import signupSchema from '../../validation/signupValidation';
import Logo from '../../assets/Login-logo.png';
import SignupPage from '../../assets/Signup-page.png';
import StyledTextInput from '../../components/StyledTextInput/StyledTextInput';
import LoginWithGoogle from '../../components/LoginWithGoogle/LoginWithGoogle';

function Signup() {
	const signup = useSelector((state) => state.signup);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState(null);
	const login = useSelector((state) => state.login);
	const signupErrorCategory = {
		EMAIL: 'email',
		PASSWORD: 'password',
		CONFIRM_PASSWORD: 'confirmPassword',
	};

	useEffect(() => {
		dispatch(resetSignupStatus());
	}, []);

	useEffect(() => {
		if (signup.success) {
			setFormData('');
		}
	}, [signup]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = signupSchema.validate(formData, {
			abortEarly: false,
		});

		if (!result.error) {
			setError(null);
			dispatch(signupAsync(formData));
		} else {
			setError(result.error.details);
		}
	};

	const handleChangeEmail = (e) => {
		setFormData({
			...formData,
			email: e.target.value,
		});
	};

	const handleChangePassword = (e) => {
		setFormData({
			...formData,
			password: e.target.value,
		});
	};

	const handleChangeConfirmPassword = (e) => {
		setFormData({
			...formData,
			confirmPassword: e.target.value,
		});
	};

	const handleResendEmail = () => {
		dispatch(signupResendEmail(signup.email));
	};

	const handleBack = () => {
		navigate(-1);
	};
	if (login.isLogin) {
		navigate('/admin');
	}
	return (
		<div className={classes.signup__container}>
			<Button
				type="button"
				className={classes.signup__back}
				onClick={handleBack}
			>
				<FontAwesomeIcon icon={faChevronLeft} size="1x" />
				<p>BACK</p>
			</Button>
			<div className={classes.signup__form}>
				<img src={Logo} alt="Quick Learner" />
				<LoginWithGoogle className={classes.login_google} />
				<section>
					<p>- OR -</p>
				</section>
				<Box className={classes.signup__box}>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find((item) => item.path[0] === signupErrorCategory.EMAIL)
							)
						}
						autoFocus
						title={
							(error &&
								error.find(
									(item) => item.path[0] === signupErrorCategory.EMAIL,
								) &&
								error.find((item) => item.path[0] === signupErrorCategory.EMAIL)
									.message) ||
							'Email Address'
						}
						type="email"
						value={formData.email}
						onChange={handleChangeEmail}
						inputProps={{
							autoComplete: 'new-username',
							form: {
								autoComplete: 'off',
							},
						}}
					/>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find(
									(item) => item.path[0] === signupErrorCategory.PASSWORD,
								)
							)
						}
						title={
							(error &&
								error.find(
									(item) => item.path[0] === signupErrorCategory.PASSWORD,
								) &&
								error.find(
									(item) => item.path[0] === signupErrorCategory.PASSWORD,
								).message) ||
							'Password'
						}
						type="password"
						value={formData.password}
						onChange={handleChangePassword}
						inputProps={{
							autoComplete: 'new-password',
							form: {
								autoComplete: 'off',
							},
						}}
					/>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find(
									(item) =>
										item.path[0] === signupErrorCategory.CONFIRM_PASSWORD,
								)
							)
						}
						title={
							(error &&
								error.find(
									(item) =>
										item.path[0] === signupErrorCategory.CONFIRM_PASSWORD,
								) &&
								error.find(
									(item) =>
										item.path[0] === signupErrorCategory.CONFIRM_PASSWORD,
								).message) ||
							'Confirm Password'
						}
						type="password"
						value={formData.confirmPassword}
						onChange={handleChangeConfirmPassword}
						inputProps={{
							autoComplete: 'new-confirmPassword',
							form: {
								autoComplete: 'off',
							},
						}}
					/>
				</Box>
				{signup.loading && <p>Loading component...</p>}
				{signup.success && (
					<div className={classes.resend__btn}>
						<span>Still not received the email ?</span>
						<Button onClick={handleResendEmail}>Resend</Button>
					</div>
				)}
				<div className={classes.signup__btnWrapper}>
					<Button onClick={handleSubmit}>Create account</Button>
				</div>
				<div className={classes.signup__redirect}>
					<p>Already have an account?</p>
					<p onClick={() => navigate('/signin')}>Login</p>
				</div>
			</div>
			<aside>
				<div className={classes.signup__overlay}>
					<div className={classes.signup__textContainer}>
						<p>Better way of quiz</p>
						<img className={classes.signup__hero} src={SignupPage} alt="hero" />
					</div>
				</div>
			</aside>
		</div>
	);
}

export default Signup;
