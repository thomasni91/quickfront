import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
	const login = useSelector((state) => state.login);
	if (!login.isLogin) {
		return <Navigate to="/signin" replace />;
	}
	return <Outlet />;
}
