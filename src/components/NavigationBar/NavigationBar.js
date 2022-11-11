import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faCheckSquare,
	faFolder,
	faCog,
	faSearch,
	faTimes,
	faBars,
	faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import classes from './NavigationBar.module.scss';
import LoginLogo from '../../assets/Login-logo.png';

function NavigationBar() {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const directAndClose = () => {
		if (window.innerWidth <= 600) {
			setClick(!click);
		}
	};
	const currentPath = useSelector((state) => state.page.pathname);
	useEffect(() => {}, [currentPath]);
	const data = [
		{
			icon: faHome,
			content: 'Home',
			link: { pathname: '/admin' },
			path: '/admin',
		},
		{
			icon: faCheckSquare,
			content: 'Create Quiz',
			link: { pathname: 'create-quiz' },
			path: '/admin/create-quiz',
		},
		{
			icon: faFolder,
			content: 'My Quiz',
			link: { pathname: 'my-quiz' },
			path: '/admin/my-quiz',
		},
		{
			icon: faChartBar,
			content: 'Result',
			link: { pathname: 'quiz-result' },
			path: '/admin/quiz-result',
		},
		{
			icon: faCog,
			content: 'Setting',
			link: { pathname: 'setting' },
			path: '/admin/setting',
		},
		{
			icon: faSearch,
			content: 'Explore',
			link: { pathname: 'explore' },
			path: '/admin/explore',
		},
	];
	const focusStyle = {
		background: '#545454',
		borderRight: '5px solid #fcc924',
	};
	return (
		<>
			<div onClick={handleClick} className={classes.mobile_click}>
				<FontAwesomeIcon
					icon={click ? faTimes : faBars}
					className={classes.mobile_hamburger}
				/>
			</div>
			<section
				className={
					click ? classes.mobile_navBar : classes.navigationBar_container
				}
			>
				<div className={classes.navigationBar_header}>
					<img src={LoginLogo} alt="brainCellLogo" />
				</div>
				<nav className={classes.navigationBar}>
					{data.map((item) => {
						const { content } = item;
						return (
							<NavLink
								key={content}
								to={item.link}
								className={classes.navigationBar_link}
								style={item.path === currentPath ? focusStyle : null}
								onClick={directAndClose}
							>
								<div
									className={
										item.content === 'Quiz Report'
											? classes.navigationBar_link_left
											: classes.navigationBar_link
									}
								>
									<FontAwesomeIcon icon={item.icon} />
									<span>{item.content}</span>
								</div>
							</NavLink>
						);
					})}
				</nav>
			</section>
		</>
	);
}
export default NavigationBar;
