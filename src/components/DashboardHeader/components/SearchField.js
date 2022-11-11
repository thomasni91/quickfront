import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	fetchAllQuiz,
	getQuestionByQuizId,
} from '../../../features/quiz/quizSlice';
import SearchFieldResult from './SearchFieldResult';
import classes from './SearchField.module.scss';

export default function SearchField() {
	const [showSearchResult, setShowSearchResult] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const questionList = useSelector((state) => state.question.questionList);

	const dispatch = useDispatch();
	useEffect(() => dispatch(fetchAllQuiz()), []);

	const { quizId } = useParams();

	useEffect(() => {
		if (typeof quizId !== 'undefined') {
			dispatch(getQuestionByQuizId({ quizId }));
		}
	}, [questionList]);

	return (
		<div className={classes.SearchField}>
			<div className={classes.SearchField_bar}>
				<SearchIcon className={classes.SearchField__icon} />
				<input
					type="text"
					placeholder={`Search ${quizId ? 'Questions' : 'Quizzes'}`}
					className={classes.SearchField__input}
					onFocus={() => setShowSearchResult(true)}
					onBlur={() => setTimeout(() => setShowSearchResult(false), 150)}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
				/>
			</div>
			{showSearchResult && (
				<SearchFieldResult searchInput={searchInput} quizId={quizId} />
			)}
		</div>
	);
}
