/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StyledTextInputWithBtn from '../StyledTextInputWithBtn/StyledTextInputWithBtn';
import SelectType from './SelectType';
import {
	saveQuizType,
	fetchQuizType,
	addNewQuizType,
} from '../../features/quizType/createQuizTypeSlice';
import {
	resetQuizId,
	loadQuiz,
	addQuizAsync,
	resetSuccess,
	updateQuizById,
} from '../../features/quiz/quizSlice';
import classes from './createQuizType.module.scss';
import { loadNotification } from '../../features/notification/notificationSlice';
import Loading from '../Loading/Loading';

function CreateQuizType({ setShowStepOne }) {
	const [tags, setTags] = useState([]);
	const quizInfo = useSelector((state) => state.quiz.currentQuiz);
	const [showForm, setShowForm] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.login.token);
	const tagList = useSelector((state) => state.quizType.quizType);
	const error = useSelector((state) => state.quizType.error);
	const createQuizSuccess = useSelector((state) => state.quiz.success);
	const quizDetail = useSelector((state) => state.quiz.quiz);
	const loading = useSelector((state) => state.quizType.loading);

	useEffect(() => {
		if (location.pathname.includes('/quiz-edit') && quizInfo) {
			setTags(quizInfo.quizTypes);
		}
	}, [quizInfo]);

	useEffect(() => {
		dispatch(resetQuizId());
	}, []);
	const quizId =
		useParams().quizId || useSelector((state) => state.quiz.quizId);
	useEffect(() => {
		dispatch(fetchQuizType(token));
	}, []);

	useEffect(() => {
		if (createQuizSuccess) {
			if (location.pathname.includes('/quiz-edit')) {
				navigate(`/admin/quiz-edit/create-question/${quizId}`);
			} else {
				navigate(`/admin/manage-question/create-question/${quizId}`);
			}
		}
		return () => {
			if (createQuizSuccess) {
				dispatch(resetSuccess(false));
			}
		};
	}, [createQuizSuccess]);

	const handlePlusBtn = () => {
		setShowForm(true);
	};

	const addNewTag = async (newTag) => {
		try {
			if (!newTag) {
				const msg = {
					message: 'the new tag name is empty',
					type: 'error',
					visible: true,
				};
				dispatch(loadNotification(msg));
				return;
			}
			const tagName = tagList.map((tag) => tag.name);
			const hasDuplicateName = tagName.indexOf(newTag);
			if (hasDuplicateName !== -1) {
				const msg = {
					message: 'the new tag already in the list',
					type: 'error',
					visible: true,
				};
				dispatch(loadNotification(msg));
				return;
			}
			const data = { newQuizType: newTag, token };
			await dispatch(addNewQuizType(data)).unwrap();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log('Failed to save the new quiz type: ', err);
		}
	};

	const handleStartQuizBtn = async () => {
		if (tags.length > 5 || tags.length < 1) {
			const msg = {
				message: 'Please choose one to five tags',
				type: 'error',
				visible: true,
			};
			dispatch(loadNotification(msg));
			return;
		}
		const data = {
			...quizDetail,
			questions: [],
			quizTypes: tags.map((tag) => tag._id),
		};
		dispatch(saveQuizType(data.quizTypes));
		dispatch(loadQuiz(data));
		dispatch(addQuizAsync(data));
	};

	const handleEditQuizBtn = async () => {
		const id = params.quizId;
		if (tags.length > 5 || tags.length < 1) {
			const msg = {
				message: 'Please choose one to five tags',
				type: 'error',
				visible: true,
			};
			dispatch(loadNotification(msg));
			return;
		}
		const data = {
			...quizDetail,
			quizTypes: tags.map((tag) => tag._id),
		};

		dispatch(updateQuizById({ quizId: id, formData: data }));
		dispatch(loadQuiz(data));
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		navigate('');
		return <h2>{error}</h2>;
	}

	return (
		<div className={classes.model__container}>
			<div className={classes.model__heading}>
				<h2 className={classes.header}>Select Quiz Topic</h2>
			</div>

			<div className={classes.model__content}>
				{showForm && (
					<StyledTextInputWithBtn
						placeholder="New Topic"
						buttonName="Add"
						handleSubmit={addNewTag}
						animation
					/>
				)}
				<p
					className={classes.model_paragraph}
					style={{ color: tags.length < 6 ? '#757575' : '#D0342C' }}
				>
					{tags.length} /5 selected
				</p>
				<ul className={classes.quizTagSelectSection}>
					{tagList.map((tag) => {
						const { _id, name } = tag;
						return (
							<SelectType
								key={_id}
								tag={name}
								selected={tags.some((tag) => tag._id === _id)}
								handleSelect={() => {
									if (tags.some((tag) => tag._id === _id)) {
										setTags((tags) =>
											tags.filter((element) => element._id !== _id),
										);
									} else {
										setTags((tags) => tags.concat(tag));
									}
								}}
							/>
						);
					})}
					<li className={classes.selctType} key="plus-btn">
						<button
							type="button"
							className={`${classes.model__quizTag} ${classes.addTagBtn}`}
							onClick={handlePlusBtn}
						>
							+
						</button>
					</li>
				</ul>
				<div className={classes.model__button__container}>
					<button
						type="button"
						onClick={() => {
							setShowStepOne(true);
						}}
						className={classes.model__previous__button}
					>
						<FontAwesomeIcon
							icon={faAngleLeft}
							size="lg"
							transform="shrink-3 left-4 top-5"
						/>
						Previous
					</button>

					{location.pathname.includes('/quiz-edit') ? (
						<button
							type="button"
							className={classes.model__start__button}
							onClick={handleEditQuizBtn}
						>
							Confirm
						</button>
					) : (
						<button
							type="button"
							className={classes.model__start__button}
							onClick={handleStartQuizBtn}
						>
							Create
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
CreateQuizType.defaultProps = {
	setShowStepOne: () => {},
};

CreateQuizType.propTypes = {
	setShowStepOne: PropTypes.func,
};
export default CreateQuizType;
