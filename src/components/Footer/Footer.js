import React from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';

export default function Footer() {
	return (
		<section className={classes.footer}>
			<span className={classes.footer_content}>About</span>
			<Link to="/about">
				<span className={classes.footer_content}>Company</span>
			</Link>
			<Link to="/privacy">
				<span className={classes.footer_content}>
					Privacy <SecurityIcon fontSize="small" />
				</span>
			</Link>
			<Link to="/cookies">
				<span className={classes.footer_content}>Ad and Coolie Policy</span>
			</Link>
			<Link to="/terms">
				<span className={classes.footer_content}>Terms</span>
			</Link>
		</section>
	);
}
