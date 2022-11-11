import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';
import CreateQuizStepOne from '../../components/CreateQuizStepOne/CreateQuizStepOne';
import CreateQuizType from '../../components/CreateQuizType/CreateQuizType';

function CreateQuizPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);
	const [showStepOne, setShowStepOne] = useState(true);
	return showStepOne ? (
		<CreateQuizStepOne setShowStepOne={setShowStepOne} />
	) : (
		<CreateQuizType setShowStepOne={setShowStepOne} />
	);
}

export default CreateQuizPage;
