import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/404.png';
import classes from './NotFound404.module.scss';

export default function NotFound404() {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className={classes.notFound__container}>
			<div className={classes.notFound__text}>
				<h3>Ooops....</h3>
				<p>Page Not Found</p>
				<p>Page Is Not Found Plz Go Back</p>
				<Button onClick={handleBack} className={classes.notFound__backBtn}>
					Go Back
				</Button>
			</div>
			<div className={classes.notFound__hero}>
				<img src={heroImg} alt="404" />
			</div>
		</div>
	);
}
