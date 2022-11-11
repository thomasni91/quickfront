import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../features/login/loginSlice';
import classes from './LoginHeader.module.scss';
import loginLogo from '../../assets/loginLogo.svg';
import loginProfile from '../../assets/guest-user.png';
import logoutProfile from '../../assets/logged-user.png';
import { getUserAvatar } from '../../api/userApi';
import { cleanUser, loadAvatar } from '../../features/user/userSlice';
import { loadNotification } from '../../features/notification/notificationSlice';

function LoginHeader() {
	const [toggle, setToggle] = useState(false);
	const avatarImage = useSelector((state) => state.user.avatar);
	const isLogin = useSelector((state) => state.login.isLogin);
	const user = useSelector((state) => state.login.user);
	const userId = useSelector((state) => state.user.id);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		getUserAvatar(userId)
			.then((res) => {
				loadAvatar(res.data.avatarUrl);
			})
			.catch((error) => {
				dispatch(
					loadNotification({
						message: error.message,
						type: 'error',
						visible: true,
					}),
				);
			});
	}, []);
	return (
		<header>
			<div className={classes.headerContainer}>
				<Link to="/">
					<div className={classes.logo_section}>
						<img src={loginLogo} alt="loginLogo" />
					</div>
				</Link>
				<div className={classes.login_area}>
					<Link className={classes.privacy} to="/cookies">
						Cookie Policy
					</Link>
					<Link to="/intro">
						<span>How It Works?</span>
					</Link>
					<Link to="/privacy" className={classes.privacy}>
						Privacy
					</Link>
					<Link to="/terms" className={classes.privacy}>
						Terms of Service
					</Link>
					<Link to="/about" className={classes.privacy}>
						About us
					</Link>
					<div className={classes.login_nav}>
						{!isLogin ? (
							<>
								<Link to="/signup">
									<Button type="Sign Up" variant="contained">
										Sign Up
									</Button>
								</Link>
								<Link to="/signin">
									<Button
										className={classes.login_navbtn_r}
										type="Login"
										variant="outlined"
										onClick={() => {
											('onClick');
										}}
									>
										Sign In
									</Button>
								</Link>
							</>
						) : (
							<Link to="/admin">
								<Button
									className={classes.login_navbtn}
									type="Login"
									variant="outlined"
									style={{ fontSize: 13 }}
									onClick={() => {
										('onClick');
									}}
								>
									Home
								</Button>
								<Button
									className={classes.login_navbtn_r}
									type="Logout"
									variant="outlined"
									style={{ fontSize: 13 }}
									onClick={() => {
										dispatch(logout());
										dispatch(cleanUser());
										if (!isLogin) {
											navigate('/');
										}
									}}
								>
									Sign Out
								</Button>
							</Link>
						)}
					</div>
				</div>
				<div className={classes.menu_group}>
					{!toggle ? (
						<div className={classes.menu_burger}>
							<MenuIcon
								className={classes.menu_btn_burger}
								onClick={() => setToggle(true)}
							/>
						</div>
					) : (
						<div className={classes.menu_close}>
							<CloseIcon
								className={classes.menu_btn_close}
								onClick={() => setToggle(false)}
							/>
						</div>
					)}
				</div>
			</div>
			{toggle && (
				<div className={classes.navBar}>
					<div
						className={classes.navBar__background}
						style={toggle ? { height: '100px' } : { height: '0px' }}
					/>
					<div className={classes.profile_section}>
						{isLogin ? (
							<div className={classes.logout_section}>
								<img
									src={avatarImage || logoutProfile}
									alt="logoutProfilePhoto"
								/>
								<div className={classes.logout_content}>
									<p className={classes.logout_text}>{user}</p>
									<div className={classes.sign_group}>
										<Button
											className={classes.logout}
											type="Logout"
											startIcon={<LogoutIcon />}
											onClick={() => {
												dispatch(logout());
												cleanUser(cleanUser());
												if (!isLogin) {
													navigate('/');
												}
											}}
										>
											Sign Out
										</Button>
									</div>
								</div>
							</div>
						) : (
							<div className={classes.login_section}>
								<img src={loginProfile} alt="loginProfilePhoto" />
								<div className={classes.logout_content}>
									<p className={classes.logout_text}>Guest</p>
									<div className={classes.sign_group}>
										<Link to="/signup">
											<Button className={classes.sign_up} type="Sign Up">
												Sign Up
											</Button>
										</Link>
										<Link to="/signin">
											<Button
												className={classes.login_mob}
												type="Login"
												variant="outlined"
											>
												Sign In
											</Button>
										</Link>
									</div>
								</div>
							</div>
						)}
						<div className={classes.btn_group}>
							{!isLogin ? (
								<div className={classes.btn}>
									<button className={classes.tab} type="button">
										How It Works?
									</button>
									<Link to="/privacy" className={classes.tab}>
										Privacy
									</Link>
									<button className={classes.tab} type="button">
										About Us
									</button>
								</div>
							) : (
								<div className={classes.btn}>
									<button className={classes.tab} type="button">
										Home
									</button>
									<button className={classes.tab} type="button">
										Create Quiz
									</button>
									<button className={classes.tab} type="button">
										My Quiz
									</button>
									<button className={classes.tab} type="button">
										Profile
									</button>
									<button className={classes.tab} type="button">
										Setting
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default LoginHeader;
