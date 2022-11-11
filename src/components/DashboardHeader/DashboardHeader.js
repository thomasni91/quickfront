import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { logout } from '../../features/login/loginSlice';
import SearchField from './components/SearchField';
import classes from './DashboardHeader.module.scss';
import logoutProfile from '../../assets/logged-user.png';
import { loadNotification } from '../../features/notification/notificationSlice';
import { cleanUser, loadAvatar } from '../../features/user/userSlice';
import { getUserAvatar } from '../../api/userApi';
import DashboardHeaderLogo from '../../assets/DashboardHeaderLogo.png';

export default function DashboardHeader() {
	const currentPath = useSelector((state) => state.page.pathname);
	const avatarImage = useSelector((state) => state.user.avatar);
	const [avatarUrl, setAvatarUrl] = useState(avatarImage);
	const path = useSelector((state) => state.page.pathname);
	const [click, setClick] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.login.userId);

	useEffect(() => {
		getUserAvatar(userId)
			.then((res) => {
				loadAvatar(res.data.avatarUrl);
				setAvatarUrl(res.data.avatarUrl);
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
	}, [path, avatarImage]);
	const handleLogout = () => {
		dispatch(logout());
		dispatch(cleanUser());
		navigate('/');
	};
	const handleClick = () => {
		setClick(!click);
	};
	return (
		<>
			<div
				className={`${
					currentPath !== '/admin/create-quiz' &&
					!currentPath.includes('/admin/quiz-edit/')
						? classes.container
						: classes.display__none
				}`}
			>
				<SearchField />
				<div className={classes.logout_section}>
					<img src={avatarUrl || logoutProfile} alt="logoutProfilePhoto" />
					<Button
						className={classes.logout}
						type="Logout"
						startIcon={<LogoutIcon sx={[{ width: 15 }]} />}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
			</div>
			<div className={classes.mobile}>
				<button
					className={classes.headerLogo}
					type="button"
					onClick={handleClick}
				>
					<img src={DashboardHeaderLogo} alt="DashboardHeaderLogo" />
				</button>
				{click && (
					<nav className={classes.nav__container}>
						<Button
							className={classes.nav__button}
							type="Logout"
							startIcon={<SettingsIcon sx={[{ width: 15 }]} />}
							onClick={() => {
								navigate('/admin/setting');
								setClick(!click);
							}}
						>
							Setting
						</Button>
						<Button
							className={classes.nav__button}
							type="Logout"
							startIcon={<LogoutIcon sx={[{ width: 15 }]} />}
							onClick={handleLogout}
						>
							Logout
						</Button>
					</nav>
				)}
			</div>
		</>
	);
}
