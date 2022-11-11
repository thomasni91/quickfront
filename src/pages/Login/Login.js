import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { handleLogin } from '../../features/login/loginSlice';
import LoginWithGoogle from '../../components/LoginWithGoogle/LoginWithGoogle';
import classes from './Login.module.scss';
import loginSchema from '../../validation/loginValidation';
import Logo from '../../assets/Login-logo.png';
import QuotMark from '../../assets/Login-quotMark.png';
import LoginHero from '../../assets/Signup-hero.png';
import RightAngleMark from '../../assets/Login-rightAngleMark.png';
import StyledTextInput from '../../components/StyledTextInput/StyledTextInput';
import {
	resendEmailResetPassword,
	resetPassword,
	sendEmailApiForResetPassword,
} from '../../features/user/userSlice';
import { capitalizeFirstLetter } from '../../utils/index';

function Login() {
	const dispatch = useDispatch();
	const { message } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [cookies, setCookie] = useCookies(['rememberMeCookies']);
	const [error, setError] = useState(null);
	const login = useSelector((state) => state.login);
	const { id } = useParams();
	const { token } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// login data validate
		const result = loginSchema.validate(formData, { abortEarly: false });
		if (!result.error) {
			setError(null);
			dispatch(handleLogin(formData));
		} else {
			setError(result.error.details);
		}
	};

	const loginStatus = {
		VERIFIED: 'verified',
		FORGOT_PASSWORD: 'forgot-password',
		RESET_PASSWORD: 'reset-password',
		RESEND_EMAIL: 'resend-email',
	};

	const loginErrorCategory = {
		EMAIL: 'email',
		PASSWORD: 'password',
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
		setConfirmPassword(e.target.value);
	};
	const handleBack = () => {
		navigate(-1);
	};
	const handleRememberMe = (e) => {
		setRememberMe(e.target.checked);
		setCookie('rememberMeCookies', e.target.checked, { path: '/' });
	};
	useEffect(() => {
		if (cookies.rememberMeCookies) {
			setRememberMe(JSON.parse(cookies.rememberMeCookies));
		}
	}, []);
	const handleNavigate = () => {
		navigate('/signin/forgot-password');
	};
	const handleSubmitResetLink = () => {
		dispatch(sendEmailApiForResetPassword({ recipientEmail: formData.email }));
		navigate('/signin/resend-email');
	};
	const handleResendEmail = () => {
		dispatch(resendEmailResetPassword({ recipientEmail: formData.email }));
	};
	const handleSubmitResetPassword = () => {
		dispatch(resetPassword({ token, password: confirmPassword }));
	};
	useEffect(() => {
		if (message === 'Password reset success') {
			navigate('/signin');
		}
	}, [message]);
	const handleNavigateWhenLogin = () => {
		if (login.isCreateQuiz) {
			return <Navigate to="/admin/create-quiz" />;
		}
		return <Navigate to="/admin/" />;
	};

	return login.isLogin ? (
		handleNavigateWhenLogin()
	) : (
		<div className={classes.login__container}>
			<h1>{login.isLogin}</h1>
			{id !== loginStatus.FORGOT_PASSWORD && id !== loginStatus.RESET_PASSWORD && (
				<Button
					type="button"
					className={classes.login__back}
					onClick={handleBack}
				>
					<FontAwesomeIcon icon={faChevronLeft} size="1x" />
					<p>BACK</p>
				</Button>
			)}
			<div className={classes.login__form}>
				<img src={Logo} alt="Quick Learner" />
				{id === loginStatus.VERIFIED && (
					<section>
						<p>Email verification successful!</p>
						<p>Please login to your account.</p>
					</section>
				)}
				{id === loginStatus.FORGOT_PASSWORD && (
					<section>
						<p style={{ fontSize: 25, marginBottom: 35, color: 'black' }}>
							Forgot your password?
						</p>
						<p>
							Tell us your email address, and we will get you back on track in
							no time.
						</p>
					</section>
				)}
				{id === loginStatus.RESEND_EMAIL && (
					<section>
						<p style={{ fontSize: 25, marginBottom: 35, color: 'black' }}>
							Still not received email?
						</p>
						<p>Click the Resend button</p>
					</section>
				)}
				{id === loginStatus.RESET_PASSWORD && (
					<section>
						<p
							style={{
								fontSize: 25,
								marginBottom: 35,
								color: 'black',
								marginTop: 50,
							}}
						>
							Reset password{' '}
						</p>
					</section>
				)}
				{id === undefined && (
					<section>
						<p>Welcome back! </p>
						<p>Please Login/Signup to your account.</p>
					</section>
				)}
				<Box className={classes.login__box}>
					{id === loginStatus.FORGOT_PASSWORD && (
						<StyledTextInput
							error={
								!!(
									error &&
									error.find(
										(item) => item.path[0] === loginErrorCategory.EMAIL,
									)
								)
							}
							autoFocus
							title={
								error &&
								error.find((item) => item.path[0] === loginErrorCategory.EMAIL)
									? capitalizeFirstLetter(
											error.find(
												(item) => item.path[0] === loginErrorCategory.EMAIL,
											).message,
									  )
									: 'Email'
							}
							type="text"
							value={formData.email}
							onChange={handleChangeEmail}
							inputProps={{
								autoComplete: rememberMe ? 'on' : 'off',
							}}
						/>
					)}
					{id === loginStatus.RESEND_EMAIL && (
						<StyledTextInput
							error={
								!!(
									error &&
									error.find(
										(item) => item.path[0] === loginErrorCategory.EMAIL,
									)
								)
							}
							autoFocus
							title={
								error &&
								error.find((item) => item.path[0] === loginErrorCategory.EMAIL)
									? capitalizeFirstLetter(
											error.find(
												(item) => item.path[0] === loginErrorCategory.EMAIL,
											).message,
									  )
									: 'Email'
							}
							type="text"
							value={formData.email}
							onChange={handleChangeEmail}
							inputProps={{
								autoComplete: rememberMe ? 'on' : 'off',
							}}
						/>
					)}
					{id !== loginStatus.FORGOT_PASSWORD &&
						id !== loginStatus.RESET_PASSWORD &&
						id !== loginStatus.RESEND_EMAIL && (
							<>
								<StyledTextInput
									error={
										!!(
											error &&
											error.find(
												(item) => item.path[0] === loginErrorCategory.EMAIL,
											)
										)
									}
									autoFocus
									title={
										error &&
										error.find(
											(item) => item.path[0] === loginErrorCategory.EMAIL,
										)
											? capitalizeFirstLetter(
													error.find(
														(item) => item.path[0] === loginErrorCategory.EMAIL,
													).message,
											  )
											: 'Email'
									}
									type="text"
									value={formData.email}
									onChange={handleChangeEmail}
									inputProps={{
										autoComplete: rememberMe ? 'on' : 'off',
									}}
								/>
								<StyledTextInput
									error={
										!!(
											error &&
											error.find(
												(item) => item.path[0] === loginErrorCategory.PASSWORD,
											)
										)
									}
									title={
										error &&
										error.find(
											(item) => item.path[0] === loginErrorCategory.PASSWORD,
										)
											? capitalizeFirstLetter(
													error.find(
														(item) =>
															item.path[0] === loginErrorCategory.PASSWORD,
													).message,
											  )
											: 'Password'
									}
									type="password"
									value={formData.password}
									onChange={handleChangePassword}
									inputProps={{
										autoComplete: rememberMe ? 'on' : 'new-password',
									}}
								/>
								<div className={classes.rememberMe}>
									<div className={classes.rememberMe_L}>
										<input
											type="checkbox"
											checked={rememberMe}
											onChange={handleRememberMe}
										/>
										Remember Me
									</div>
									<Button
										onClick={handleNavigate}
										style={{
											cursor: 'pointer',
											color: 'rgba(0, 0, 0, 0.61)',
											textTransform: 'capitalize',
										}}
									>
										Forgot Password?
									</Button>
								</div>
							</>
						)}
					{id === loginStatus.RESET_PASSWORD && (
						<>
							<StyledTextInput
								title="Password"
								type="password"
								required
								value={formData.password}
								onChange={handleChangePassword}
							/>
							<StyledTextInput
								error={!(formData.password === confirmPassword)}
								title="Confirm Password"
								type="password"
								required
								value={confirmPassword}
								onChange={handleChangeConfirmPassword}
							/>
						</>
					)}
				</Box>
				<div className={classes.login__btnWrapper}>
					{id === loginStatus.FORGOT_PASSWORD && (
						<Button
							style={{ width: '81%', textTransform: 'none' }}
							onClick={handleSubmitResetLink}
						>
							Request Reset Link
						</Button>
					)}
					{id === loginStatus.RESEND_EMAIL && (
						<Button
							style={{ width: '81%', textTransform: 'none' }}
							onClick={handleResendEmail}
						>
							Resend Email
						</Button>
					)}
					{id === loginStatus.RESET_PASSWORD && (
						<Button
							style={{ width: '81%', textTransform: 'none' }}
							onClick={handleSubmitResetPassword}
						>
							Reset Password
						</Button>
					)}
					{id === loginStatus.VERIFIED && (
						<Button style={{ width: '81%' }} onClick={handleSubmit}>
							Login
						</Button>
					)}
					{id === undefined && (
						<>
							<Button onClick={handleSubmit}>Login</Button>
							<Button onClick={() => navigate('/signup')}>Signup</Button>
						</>
					)}
				</div>
				{id === undefined && (
					<div className={classes.login__footer}>
						<p>Or Login With</p>
						<LoginWithGoogle className={classes.login_google} />
					</div>
				)}
				{id === loginStatus.FORGOT_PASSWORD && (
					<Button
						style={{
							marginTop: '10%',
							color: '#7B7B7B',
							textTransform: 'none',
							fontSize: 16,
						}}
						type="button"
						onClick={handleBack}
					>
						<p>Back to Sign In</p>
					</Button>
				)}
			</div>
			<aside>
				<div className={classes.login__overlay}>
					<div className={classes.login__textContainer}>
						<div className={classes.login__text}>
							<img
								className={classes.login__quotMark}
								src={QuotMark}
								alt="Quotation marks"
							/>
							<p>
								Without the continuous bitter cold, there can be no fragrant
								plum blossom.
							</p>
							<img
								className={classes.login__rightAngleMark}
								src={RightAngleMark}
								alt="Right angle mark"
							/>
						</div>
						<img className={classes.Login__hero} src={LoginHero} alt="hero" />
					</div>
				</div>
			</aside>
		</div>
	);
}

export default Login;
