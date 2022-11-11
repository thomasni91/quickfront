import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import audience from '../../assets/audience.png';
import devices from '../../assets/devices.png';
import LandingPicture from '../../assets/landing-img.png';
import quiz from '../../assets/quiz.png';
import Introduction from '../../components/Introduction/Introduction';
import { linkToCreateQuiz } from '../../features/login/loginSlice';
import classes from './LandingPage.module.scss';

export default function LandingPage() {
	const dispatch = useDispatch();

	const handleCreateQuiz = () => {
		dispatch(linkToCreateQuiz(true));
	};
	return (
		<>
			<div className={classes.landingContent}>
				<div className={classes.content}>
					<h1 className={classes.landingTitle}>
						Learn
						<br /> new concepts
						<br />
						for each question
					</h1>
					<div className={classes.landingSubtitle}>
						<div className={classes.landingSubtitleDes}>
							We help you prepare for exams and quizes
						</div>
					</div>

					<div className={classes.landingButton}>
						<div className={classes.landingButtonLeft}>
							<Link to="/admin/create-quiz">
								<Button
									className={classes.createBtn}
									size="large"
									onClick={handleCreateQuiz}
								>
									Create Quiz
								</Button>
							</Link>
						</div>
						<div className={classes.landingButtonRight}>
							<FontAwesomeIcon icon={faSortDown} />
							<a href="#learnMore">Learn More</a>
						</div>
					</div>
				</div>
				<div className={classes.hero}>
					<img src={LandingPicture} alt="students" />
				</div>
			</div>
			<Introduction />
			<div id="learnMore" className={classes.knowMore_content}>
				<h2>Getting started is free and easy</h2>
				<div className={classes.threeStepsContainer}>
					<div className={classes.stepItem}>
						<p className={classes.stepItemNum}>1</p>
						<p className={classes.stepItemTitle}>Add quiz and questions.</p>
						<img src={quiz} alt="laptop" />
					</div>
					<div className={classes.stepItem}>
						<p className={classes.stepItemNum}>2</p>
						<p className={classes.stepItemTitle}>
							Participants engage from any device.
						</p>
						<img src={devices} alt="different electrical devices" />
					</div>
					<div className={classes.stepItem}>
						<p className={classes.stepItemNum}>3</p>
						<p className={classes.stepItemTitle}>Get instant feedback.</p>
						<img src={audience} alt="data analysis" />
					</div>
				</div>
			</div>
		</>
	);
}
