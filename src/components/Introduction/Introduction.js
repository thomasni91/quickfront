/* eslint-disable max-len */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Introduction.module.scss';

const introInfo = [
	{
		title: 'Flashcards on repeat. Study modes on shuffle.',
		url: 'https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&amp;rect=0,2,3072,2395&amp;w=1026&amp;h=800 1x, https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&amp;rect=0,0,3072,2395&amp;w=1026&amp;h=800 2x',
		content:
			'Mixed with smart study tools, our flashcards have been helping students ace their toughest exams since 2005.',
	},
	{
		title: 'Whether you plan or cram, find your study jam.',
		url: 'https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&amp;rect=0,2,3072,2395&amp;w=1026&amp;h=800 1x, https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&amp;rect=0,3,3072,2395&amp;w=1026&amp;h=800 2x',
		content:
			'Early morning? All-nighter? With science-backed revision methods that improve active recall, Quick Learner is designed to save you time.',
	},
	{
		title: 'Millions of study sets.',
		url: 'https://images.prismic.io/quizlet-prod/6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_Home_MobileApp.png?auto=compress,format&amp;rect=0,2,3072,2395&amp;w=1026&amp;h=800 1x, https://images.prismic.io/quizlet-prod/6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_Home_MobileApp.png?auto=compress,format&amp;rect=0,2,3072,2395&amp;w=1026&amp;h=800 2x',
		content:
			'Discover study sets created by teachers, lecturers and other students, or easily create your own. Revise at home, school or on the go with the mobile app.',
	},
	{
		title: 'Explanations you can trust.',
		url: 'https://images.prismic.io/quizlet-prod/99cd5988-f3a3-4432-aa3c-1e8941f59cb9_20210814_QZ_Home_Explanations.png?auto=compress,format&amp;rect=0,0,3072,2395&amp;w=1026&amp;h=800 1x, https://images.prismic.io/quizlet-prod/99cd5988-f3a3-4432-aa3c-1e8941f59cb9_20210814_QZ_Home_Explanations.png?auto=compress,format&amp;rect=0,2,3072,2395&amp;w=1026&amp;h=800 2x',
		content:
			'Quick Learner explanations show you step-by-step approaches to solve tough problems. Find solutions in 64 subjects, all written and verified by experts.',
	},
];

const commentInfo = [
	{
		comment:
			'Quick Learner encouraged me to use active recall instead of just reading lecture slides, which means I’ve been able to study less but so much more effectively.',
		author: '- kkubina0110, age 20',
	},
	{
		comment:
			'Quick Learner gives me an easy way to revise, which I can do on the go with the Quick Learner app!',
		author: '- gabriellalockwood1, age 20',
	},
	{
		comment:
			'Quick Learner has been supporting my success since GCSEs. Flashcards available on the go are single handedly getting me through university.',
		author: '- Hamza_Anwar, age 20',
	},
	{
		comment:
			'Quick Learner is a great way to study. I introduced it to my friends and we are all improving. Whenever I think of Quick Learner, I think of the pure joy of studying in a few minutes instead of hours.',
		author: '- AgentDolly, age 29',
	},
];

export default function Introduction() {
	React.useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);
	return (
		<div id="intro">
			<Carousel className={classes.Introduction_comment} variant="dark">
				{commentInfo.map((e) => (
					<Carousel.Item
						className={classes.Introduction_comment_item}
						key={e.author}
					>
						<h3 className={classes.comment}>{e.comment}</h3>
						<p className={classes.author}>{e.author}</p>
					</Carousel.Item>
				))}
			</Carousel>
			<section className={classes.Introduction_tiitle}>
				<h2>
					<em className={classes.em}>90%</em> of students who use Quick Learner
					report receiving higher marks.
				</h2>
			</section>
			{introInfo.map((currElement, index) => (
				<section
					className={classes.Introduction_content_container}
					key={currElement.url}
				>
					<div
						className={`${classes.Introduction_img} ${
							index % 2 && classes.order
						}`}
					>
						<img alt={currElement.title} srcSet={currElement.url} />
					</div>
					<div className={classes.Introduction_content}>
						<div className={classes.Introduction_subtiitle}>
							<h2>{currElement.title}</h2>
						</div>
						<div className={classes.Introduction_subcontent}>
							<p>{currElement.content}</p>
						</div>
					</div>
				</section>
			))}
		</div>
	);
}
