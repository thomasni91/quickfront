import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';
import { getQuizByInfo } from '../../features/quiz/quizSlice';
import CreateQuizStepOne from '../../components/CreateQuizStepOne/CreateQuizStepOne';
import CreateQuizType from '../../components/CreateQuizType/CreateQuizType';

function EditQuizPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { quizId } = useParams();
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);

	useEffect(() => {
		dispatch(getQuizByInfo({ code: quizId }));
	}, []);

	const [showStepOne, setShowStepOne] = useState(true);
	return showStepOne ? (
		<CreateQuizStepOne setShowStepOne={setShowStepOne} />
	) : (
		<CreateQuizType setShowStepOne={setShowStepOne} />
	);
}

export default EditQuizPage;
