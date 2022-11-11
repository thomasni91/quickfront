import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Signup from '../pages/Signup/Signup';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Login/Login';
import HomePage from '../pages/HomePage/HomePage';
import ManageQuizPage from '../pages/ManageQuizPage/ManageQuizPage';
import MultipleChoiceQuestion from '../components/Question/MultipleChoice';
import LandingLayout from '../layouts/LandingLayout';
import AdminLayout from '../layouts/AdminLayout';
import NotFound404 from '../pages/NotFound404/NotFound404';
import QuizDetailReview from '../components/QuizDetailReview/QuizDetailReview';
import FinishQuiz from '../pages/FinishQuiz/FinishQuiz';
import AnswerQuizPage from '../pages/AnswerQuizPage/AnswerQuizPage';
import CreateQuizPage from '../pages/CreateQuizPage/CreateQuizPage';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import MyQuizPage from '../pages/MyQuizPage/MyQuizPage';
import Setting from '../pages/Setting/Setting';
import EditQuizPage from '../pages/EditQuizPage/EditQuizPage';
import EmailVerification from '../components/EmailVerification/EmailVerification';
import PopularQuiz from '../components/PopularQuiz/PopularQuiz';
import QuizResult from '../pages/QuizResult/QuizResult';
import CheckQuizResult from '../pages/CheckQuizResult/CheckQuizResult';
import Cookies from '../pages/CookiesPage/Cookies';
import TermsOfService from '../pages/TermsOfService/TermsOfService';
import Privacy from '../pages/PrivacyPage/Privacy';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import Introduction from '../components/Introduction/Introduction';

function Routers() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/about" element={<AboutUsPage />} />
					<Route path="/cookies" element={<Cookies />} />
					<Route path="/intro" element={<Introduction />} />
					<Route
						path="/email-verified/:token"
						element={<EmailVerification />}
					/>
					<Route path="/terms" element={<TermsOfService />} />
				</Route>
				<Route path="/signin" element={<Login />} />
				<Route path="/signin/:id" element={<Login />} />
				<Route path="/signin/:id/:token" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/answer/:quizId" element={<AnswerQuizPage />} />
				<Route element={<PrivateRoute />}>
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="/admin" index element={<HomePage />} />
						<Route
							path="popular-category/:name/:id"
							index
							element={<PopularQuiz />}
						/>
						<Route path="quiz-result" element={<QuizResult />} />
						<Route path="create-quiz" element={<CreateQuizPage />} />
						<Route path="manage-quiz" element={<ManageQuizPage />} />
						<Route path="my-quiz" element={<MyQuizPage />} />
						<Route path="quiz-edit/:quizId" element={<EditQuizPage />} />
						<Route path="quiz-result/:quizId" element={<CheckQuizResult />} />
						<Route
							path="quiz-edit/create-question/:quizId"
							element={<MultipleChoiceQuestion />}
						/>
						<Route
							path="manage-question"
							element={<MultipleChoiceQuestion />}
						/>
						<Route
							path="manage-question/create-question/:quizId"
							element={<MultipleChoiceQuestion />}
						/>
						<Route path="quiz-detail/:quizId" element={<QuizDetailReview />} />
						<Route path="setting" element={<Setting />} />
						<Route path="finish-quiz/:quizId" element={<FinishQuiz />} />
						<Route path="explore" element={<ExplorePage />} />
					</Route>
				</Route>
				<Route path="/*" element={<NotFound404 />} />
			</Routes>
		</Router>
	);
}

export default Routers;
