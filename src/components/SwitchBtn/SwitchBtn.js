import React from 'react';
import classes from './SwitchBtn.module.scss';

function SwitchBtn({ options, status, setStatus }) {
	return (
		<div className={classes.switchBtn__container}>
			<div
				className={classes.switchBtn__slidingBlock}
				style={status !== options[0].label ? { left: '90px' } : { left: '0px' }}
			/>
			{options.map((item) => (
				<div
					key={item.label}
					className={classes.switchBtn__btn}
					onClick={() => {
						setStatus(item.label);
					}}
					style={
						status === item.label ? { color: 'white' } : { color: 'black' }
					}
				>
					<img
						className={classes.switchBtn__icon}
						src={item.icon}
						alt={item.alt}
					/>
				</div>
			))}
		</div>
	);
}

export default SwitchBtn;
