import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUserAvatar } from '../api/userApi';
import LoginHeader from '../components/LoginHeader/LoginHeader';
import { loadNotification } from '../features/notification/notificationSlice';
import { loadAvatar } from '../features/user/userSlice';
import Footer from '../components/Footer/Footer';

export default function LandingLayout() {
	const userId = useSelector((state) => state.login.userId);
	const dispatch = useDispatch();

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
		<>
			<LoginHeader />
			<Outlet />
			<Footer />
		</>
	);
}
