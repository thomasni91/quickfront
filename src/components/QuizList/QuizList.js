import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import paginate from '../../utils/pagination';
import Loading from '../Loading/Loading';
import QuizCard from './QuizCard';
import classes from './QuizList.module.scss';

function QuizList() {
	const [page, setPage] = useState(0);
	const [quizzes, setQuizzes] = useState([]);
	const loading = useSelector((state) => state.quiz.loading);
	const success = useSelector((state) => state.quiz.success);
	const quizList = useSelector((state) => state.quiz.filteredQuizList);
	const quizTypeList = useSelector((state) => state.quiz.filteredQuizList);
	const PaginatedData = paginate(quizList, 10);

	useEffect(() => {
		setQuizzes(PaginatedData[page]);
	}, [page, quizList, quizTypeList]);

	const handlePage = (index) => {
		setPage(index);
	};

	const handlePrev = () => {
		setPage((prevPage) => {
			if (prevPage === 0) {
				return PaginatedData.length - 1;
			}
			return prevPage - 1;
		});
	};

	const handleNext = () => {
		setPage((prevPage) => {
			if (prevPage === PaginatedData.length - 1) {
				return 0;
			}
			return prevPage + 1;
		});
	};
	if (loading) {
		return <Loading />;
	}

	if (!success) {
		return <h2>failed to load data</h2>;
	}
	return (
		<>
			<div className={classes.quizList}>
				{quizzes ? (
					quizzes.map((quiz) => (
						<QuizCard
							key={quiz._id.toString()}
							quizId={quiz._id}
							name={quiz.name}
							description={quiz.description}
							questionNumber={quiz.questions.length}
							timeLimit={quiz.timeLimit}
						/>
					))
				) : (
					<div className={classes.noQuiz}>Sorry, no quiz found </div>
				)}
			</div>
			<div className={classes.quizList__button__container}>
				<button
					type="button"
					onClick={handlePrev}
					className={classes.quizList__button__previous}
				>
					Previous
				</button>
				{PaginatedData &&
					PaginatedData.map((item, index) => (
						<button
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							type="button"
							className={`${classes.quizList__button} ${
								index === page && classes.quizList__button__active
							}`}
							onClick={() => handlePage(index)}
						>
							{index + 1}
						</button>
					))}
				<button
					type="button"
					onClick={handleNext}
					className={classes.quizList__button__next}
				>
					Next
				</button>
			</div>
		</>
	);
}

export default QuizList;
