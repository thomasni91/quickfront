import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getQuizCover } from '../../api/quizApi';
import UploadPhoto from '../../assets/UploadPhoto.png';
import { loadNotification } from '../../features/notification/notificationSlice';
import { loadQuiz, resetSuccess } from '../../features/quiz/quizSlice';
import { capitalizeFirstLetter } from '../../utils/index';
import quizSchema from '../../validation/quizValidation';
import ImageCropPopup from '../ImageCropPopup/ImageCropPopup';
import StyledSelectMenu from '../StyledSelectMenu/StyledSelectMenu';
import StyledTextInput from '../StyledTextInput/StyledTextInput';
import classes from './CreateQuizStepOne.module.scss';

const FILE_LIMITED = 3;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

function CreateQuizStepOne({ setShowStepOne }) {
	const difficultyOptions = ['Hard', 'Medium', 'Easy'];
	const location = useLocation();
	const quizInfo = useSelector((state) => state.quiz.currentQuiz);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		grade: '',
		timeLimit: '',
		difficulty: '',
		description: '',
		quizCover: '',
	});
	const [imageSrc, setImageSrc] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		if (imageSrc) {
			setImageUrl(URL.createObjectURL(imageSrc));
			setFormData({ ...formData, quizCover: imageSrc });
		}
	}, [imageSrc]);

	const inputCategory = {
		NAME: 'name',
		GRADE: 'grade',
		TIME_LIMIT: 'timeLimit',
		DIFFICULTY: 'difficulty',
		DESCRIPTION: 'description',
	};

	const Input = styled('input')({
		display: 'none',
	});

	useEffect(() => {
		if (location.pathname.includes('/quiz-edit') && quizInfo) {
			setFormData({
				name: quizInfo.name,
				grade: quizInfo.grade,
				timeLimit: quizInfo.timeLimit,
				difficulty: quizInfo.difficulty,
				description: quizInfo.description,
			});
			getQuizCover(quizInfo._id)
				.then((res) => {
					setImageUrl(res.data.imageUrl);
				})
				.catch((error) => {
					dispatch(
						loadNotification({
							message: error.message,
							type: 'error',
							visible: true,
						}),
					);
				});
		}
	}, [quizInfo]);

	const [error, setError] = useState(null);

	useEffect(() => {
		dispatch(resetSuccess(false));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// quiz data validate
		const result = quizSchema.validate(
			{
				name: formData.name,
				timeLimit: formData.timeLimit,
				grade: formData.grade,
				description: formData.description,
				difficulty: formData.difficulty,
			},
			{ abortEarly: false },
		);
		if (result.error) {
			setError(result.error.details);
			return;
		}
		setError(null);
		dispatch(
			loadQuiz({
				name: formData.name,
				timeLimit: formData.timeLimit,
				grade: formData.grade,
				description: formData.description,
				difficulty: formData.difficulty,
				quizCover: formData.quizCover,
			}),
		);
		setShowStepOne(false);
	};
	const handleChangeQuizName = (e) => {
		setFormData({
			...formData,
			name: e.target.value,
		});
	};

	const handleChangeGrade = (e) => {
		setFormData({
			...formData,
			grade: e.target.value,
		});
	};

	const handleChangeTimer = (e) => {
		setFormData({
			...formData,
			timeLimit: e.target.value,
		});
	};

	const handleChangeDifficulty = (e) => {
		setFormData({
			...formData,
			difficulty: e.target.value,
		});
	};

	const handleChangeDescription = (e) => {
		setFormData({
			...formData,
			description: e.target.value,
		});
	};

	const handleSelecteImage = (e) => {
		// check if size is too big
		const selectedImage = e.target.files[0];
		const filesize = (selectedImage.size / 1024 / 1024).toFixed(4);
		if (filesize < FILE_LIMITED) {
			// enable crop component
			setImageSrc(selectedImage);
			// setFormData({ ...formData, quizCover: selectedImage });
			handleOpen();
		} else {
			dispatch(
				loadNotification({
					message: `Image file must be less than ${FILE_LIMITED}MB`,
					type: 'error',
					visible: true,
				}),
			);
		}
	};
	return (
		<div className={classes.model__container}>
			<div className={classes.model__heading}>
				<h2 className={classes.header}>Quiz Details</h2>
			</div>
			<div className={classes.model__content}>
				<div className={classes.uploadPhoto_area}>
					<img src={(imageUrl && imageUrl) || UploadPhoto} alt="uploadPhoto" />
					<div className={classes.uploadPhoto_right}>
						<label htmlFor="contained-button-file">
							<Input
								accept="image/png, image/jpeg"
								id="contained-button-file"
								type="file"
								onChange={handleSelecteImage}
							/>
							<Button
								className={classes.upload_btn}
								variant="contained"
								component="span"
							>
								Upload
							</Button>
							<p>Drag and drop or click here to upload the quiz image</p>
						</label>
					</div>
				</div>
				<div className={classes.input_container}>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find((item) => item.path[0] === inputCategory.NAME)
							)
						}
						title={
							error && error.find((item) => item.path[0] === inputCategory.NAME)
								? capitalizeFirstLetter(
										error.find((item) => item.path[0] === inputCategory.NAME)
											.message,
								  )
								: 'Quiz Name'
						}
						className={classes.name}
						value={String(formData.name)}
						type="text"
						onChange={handleChangeQuizName}
					/>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find((item) => item.path[0] === inputCategory.GRADE)
							)
						}
						title={
							error &&
							error.find((item) => item.path[0] === inputCategory.GRADE)
								? capitalizeFirstLetter(
										error.find((item) => item.path[0] === inputCategory.GRADE)
											.message,
								  )
								: 'Grade'
						}
						className={classes.grade}
						value={String(formData.grade)}
						type="number"
						onChange={handleChangeGrade}
					/>
					<StyledTextInput
						error={
							!!(
								error &&
								error.find((item) => item.path[0] === inputCategory.TIME_LIMIT)
							)
						}
						title={
							error &&
							error.find((item) => item.path[0] === inputCategory.TIME_LIMIT)
								? capitalizeFirstLetter(
										error.find(
											(item) => item.path[0] === inputCategory.TIME_LIMIT,
										).message,
								  )
								: 'Time Limit'
						}
						className={classes.timer}
						value={String(formData.timeLimit)}
						type="number"
						onChange={handleChangeTimer}
						endAdornment={<InputAdornment position="end">mins</InputAdornment>}
					/>
					<StyledSelectMenu
						error={
							!!(
								error &&
								error.find((item) => item.path[0] !== inputCategory.DIFFICULTY)
							)
						}
						title={
							error &&
							error.find((item) => item.path[0] === inputCategory.DIFFICULTY)
								? capitalizeFirstLetter(
										error.find(
											(item) => item.path[0] === inputCategory.DIFFICULTY,
										).message,
								  )
								: 'Difficulty'
						}
						className={classes.difficulty}
						value={String(formData.difficulty)}
						onChange={handleChangeDifficulty}
						options={difficultyOptions}
					/>
					<div className={classes.description}>
						<StyledTextInput
							error={
								!!(
									error &&
									error.find(
										(item) => item.path[0] === inputCategory.DESCRIPTION,
									)
								)
							}
							title={
								error &&
								error.find((item) => item.path[0] === inputCategory.DESCRIPTION)
									? capitalizeFirstLetter(
											error.find(
												(item) => item.path[0] === inputCategory.DESCRIPTION,
											).message,
									  )
									: 'Description (optional)'
							}
							value={String(formData.description)}
							type="text"
							onChange={handleChangeDescription}
						/>
					</div>
				</div>

				<div className={classes.model_btn}>
					<Button
						className={classes.next}
						variant="contained"
						endIcon={<NavigateNextIcon />}
						onClick={handleSubmit}
					>
						Next
					</Button>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography>Crop Image</Typography>
					<ImageCropPopup
						imageUrl={imageUrl}
						setImage={setImageSrc}
						closeModel={handleClose}
					/>
				</Box>
			</Modal>
		</div>
	);
}

CreateQuizStepOne.defaultProps = {
	setShowStepOne: () => {},
};

CreateQuizStepOne.propTypes = {
	setShowStepOne: PropTypes.func,
};

export default CreateQuizStepOne;
