import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import './SearchQuizByCode.scss';
import { loadNotification } from '../../features/notification/notificationSlice';
import StyledTextInputWithBtn from '../StyledTextInputWithBtn/StyledTextInputWithBtn';

function SearchQuizByCode() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSearchQuizBtn = async (code) => {
		const data = { code };
		if (!code.length) {
			dispatch(
				loadNotification({
					message: ' Join code is empty, please input code',
					type: 'error',
					visible: true,
				}),
			);
			return;
		}
		try {
			const quiz = await dispatch(getQuizByInfo(data)).unwrap();
			const { _id: id } = quiz;
			navigate(`quiz-detail/${id}`);
		} catch (error) {
			dispatch(
				loadNotification({
					message: ' Join code not found, please check your join code',
					type: 'error',
					visible: true,
				}),
			);
		}
	};
	return (
		<div className="searchQuizByCode">
			<StyledTextInputWithBtn
				placeholder="Enter your join code"
				buttonName="Join"
				handleSubmit={handleSearchQuizBtn}
				className="searchQuizByCode"
			/>
		</div>
	);
}

export default SearchQuizByCode;
