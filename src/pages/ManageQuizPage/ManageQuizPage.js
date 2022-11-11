import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPagePath } from '../../features/page/pageSlice';
import './ManageQuizPage.scss';
import CreateNewQuestion from '../../components/CreateANewQuestion/CreateANewQuestion';
import Question from '../../components/Question/Question';
import ResponsiveDialog from '../../components/MyquizDelete/MyquizDelete';

function ManageQuizPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	useEffect(() => {
		dispatch(addPagePath(location.pathname));
	}, [location]);
	return (
		<section className="page__container">
			<div className="quiz_content">
				<CreateNewQuestion />
				<Question />
				<ResponsiveDialog />
			</div>
		</section>
	);
}
export default ManageQuizPage;
