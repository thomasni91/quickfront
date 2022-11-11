import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './features/login/loginSlice';
import notificationReducer from './features/notification/notificationSlice';
import questionReducer from './features/question/questionSlice';
import quizReducer from './features/quiz/quizSlice';
import createQuizTypeReducer from './features/quizType/createQuizTypeSlice';
import signupReducer from './features/signup/signupSlice';
import answerReducer from './features/answer/answerSlice';
import myQuizReducer from './features/myQuiz/myQuizSlice';
import pageReducer from './features/page/pageSlice';
import takeQuizReducer from './features/takeQuiz/takeQuizSlice';
import userReducer from './features/user/userSlice';

const persistConfig = {
	key: 'root',
	storage,
};
const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		signup: signupReducer,
		quiz: quizReducer,
		question: questionReducer,
		quizType: createQuizTypeReducer,
		login: loginReducer,
		notification: notificationReducer,
		answer: answerReducer,
		page: pageReducer,
		myQuiz: myQuizReducer,
		takeQuiz: takeQuizReducer,
		user: userReducer,
	}),
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});
export const persistor = persistStore(store);
// persistor.purge();
export default store;
