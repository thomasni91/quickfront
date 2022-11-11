import {
	faCheckCircle,
	faExclamationCircle,
	faExclamationTriangle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Notification.module.scss';
import { toggleNotification } from '../../features/notification/notificationSlice';

export default function Notification({
	visible,
	message,
	type,
	backgroundColor,
}) {
	const dispatch = useDispatch();
	const styles = { backgroundColor };
	const notificationStatus = {
		SUCCESS: 'success',
		ERROR: 'error',
		WARNING: 'warning',
	};
	useEffect(() => {
		let dismiss;
		if (visible) {
			dismiss = setTimeout(() => {
				dispatch(toggleNotification({ visible: false }));
			}, 3000);
		}
		return () => {
			clearTimeout(dismiss);
		};
	}, [visible]);

	return (
		<div className={classes.notification__container}>
			<div
				className={`${classes.notification__body} ${classes[type]} ${
					visible ? classes.open : classes.close
				} `}
				style={styles}
			>
				{type === notificationStatus.SUCCESS && (
					<FontAwesomeIcon icon={faCheckCircle} color="#F9FFEF" />
				)}
				{type === notificationStatus.ERROR && (
					<FontAwesomeIcon icon={faExclamationCircle} color="#F9FFEF" />
				)}
				{type === notificationStatus.WARNING && (
					<FontAwesomeIcon icon={faExclamationTriangle} color="#F9FFEF" />
				)}
				<p>{typeof message === 'string' ? message : 'Something went wrong'}</p>
				<FontAwesomeIcon
					icon={faTimes}
					color="#F9FFEF"
					cursor="pointer"
					className="close__tag"
					onClick={() => {
						dispatch(toggleNotification({ visible: false }));
					}}
				/>
			</div>
		</div>
	);
}
