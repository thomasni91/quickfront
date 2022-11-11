import React from 'react';
import { Outlet } from 'react-router-dom';

import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import NavigationBar from '../components/NavigationBar/NavigationBar';

import classes from './AdminLayout.module.scss';

export default function AdminLayout() {
	return (
		<div className={classes.fullPage}>
			<NavigationBar />
			<div className={classes.contentPage}>
				<main className={`${classes['inner-page']}`}>
					<DashboardHeader />
					<Outlet />
				</main>
			</div>
		</div>
	);
}
