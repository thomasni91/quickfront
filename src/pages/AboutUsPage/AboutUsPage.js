import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import classes from './AboutUsPage.module.scss';
import Learner from '../../assets/About_quickLearner.png';
import Victory from '../../assets/About_victory.png';
import Note from '../../assets/About_notebook.png';

function AboutUsPage() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);
	const navigate = useNavigate();
	return (
		<div className={classes.about__container}>
			<div className={classes.about__contentWrapper}>
				<h3 className={classes.about__title}>About QuickLearner</h3>
				<section>
					<div className={classes.about__content}>
						<h3>Making every student unstoppable</h3>
						<p>
							At QuickLearner, we believe that anyone can learn anything. All it
							takes is a tenacious spirit, the right guidance, and the tools to
							see it through. We know that students are under more pressure than
							ever. It can leave them overwhelmed, be anxiety-producing and make
							it all too easy to burn out.
						</p>
						<p>
							It’s our job to give every student the tools and confidence to
							succeed, no matter what their motivation, or what they’re striving
							to achieve.
						</p>
						<Button
							className={classes.about__yellowBtn}
							size="large"
							onClick={() => {
								navigate('/intro');
							}}
						>
							Learn more
						</Button>
					</div>
					<div className={classes.about__image}>
						<img src={Learner} alt="learner" />
					</div>
				</section>
				<section>
					<div className={classes.about__content}>
						<h3>It started with a victory</h3>
						<p>
							In 2005 Andrew Sutherland created a studying tool to help him ace
							a French vocabulary test. He aced it. And shared it with his
							friends. Who started acing their tests. And now, more than a
							decade later, 50 million students and learners use QuickLearner
							every month for everything from math tests to medical exams to,
							well, French vocabulary quizzes.
						</p>
					</div>
					<div className={classes.about__image}>
						<img src={Victory} alt="victory" />
					</div>
				</section>
				<section>
					<div className={classes.about__textImage}>
						<img src={Note} alt="notebook" />
					</div>
					<div className={classes.about__content}>
						<h3>From a single classroom to schools around the world</h3>
						<p>
							What started as a simple tool has grown into seven different study
							modes, tools to help teachers get the most out of their students,
							and activities to help classes learn and have fun together. And
							that’s just the start. We’re working on unleashing the magic of
							one-on-one learning for every student, shaping the future of
							personalized learning through an assistant to help guide and
							motivate every learner.
						</p>
					</div>
				</section>
				<section>
					<div className={classes.about__achievementsContainer}>
						<h2>
							<em>60</em>
							<p> million monthly learners</p>
						</h2>
						<h2>
							<em>500+</em>
							<p>million study sets</p>
						</h2>
						<h2>
							<em>2 in 3</em>
							<p> US high school students use Quizlet </p>
						</h2>
					</div>
				</section>
			</div>
		</div>
	);
}

export default AboutUsPage;
