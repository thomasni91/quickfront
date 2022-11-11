import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyLogo from '../../assets/EmptyLogo.png';
import CreateQuizBtn from '../CreateQuizBtn/CreateQuizBtn';
import classes from './EmptyPage.module.scss';

function EmptyHomePage({ children, hasButton }) {
	const nagivate = useNavigate();
	const handleJoinQuiz = () => nagivate('explore');
	return (
		<div className={classes.EmptyHomePage_container}>
			<div className={classes.title}>{children}</div>
			<img src={EmptyLogo} alt="astronutLogo" />
			{hasButton && (
				<div className={classes.buttonGroup}>
					<CreateQuizBtn className={classes.create_quiz} />
					<Button onClick={handleJoinQuiz} className={classes.join_quiz}>
						Join Quiz
					</Button>
				</div>
			)}
		</div>
	);
}

export default EmptyHomePage;
