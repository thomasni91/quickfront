import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAvatar } from '../../api/userApi';
import loggedUser from '../../assets/logged-user.png';
import { deleteUserAsync } from '../../features/login/loginSlice';
import { loadNotification } from '../../features/notification/notificationSlice';
import { changeAvatar } from '../../features/user/userSlice';
import AlertDialog from '../AlertDialog/AlertDialog';
import ChangePassword from '../ChangePassword/ChangePassword';
import ChangeUserName from '../ChangeUserName/ChangeUserName';
import ImageCropPopup from '../ImageCropPopup/ImageCropPopup';
import classes from './SettingDisplay.module.scss';

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
export default function SettingDisplay() {
	const dispatch = useDispatch();
	const Input = styled('input')({
		display: 'none',
	});
	const userId = useSelector((state) => state.login.userId);
	const username = useSelector((state) => state.login.name);
	const userAvatar = useSelector((state) => state.user.avatar);
	const { loginMethod } = useSelector((state) => state.login);
	// delete account dialog
	const [popOpen, setPopOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const [imageUrl, setImageUrl] = useState(userAvatar);
	const [open, setOpen] = useState(false);

	// Open delete account dialog
	const handleOpen = () => setPopOpen(true);
	const handleClose = () => setPopOpen(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleSaveAvatar = () => {
		dispatch(changeAvatar({ avatarImage: imageSrc, userId, username }));
	};
	useEffect(() => {
		getUserAvatar(userId).then((res) => {
			setImageUrl(res.data.avatarUrl);
		});
	}, []);
	useEffect(() => {
		if (imageSrc) {
			setImageUrl(URL.createObjectURL(imageSrc));
		}
	}, [imageSrc]);
	const handleSelecteImage = (e) => {
		// check if size is too big
		const selectedImage = e.target.files[0];
		const filesize = (selectedImage.size / 1024 / 1024).toFixed(4);
		if (filesize < FILE_LIMITED) {
			// enable crop component
			setImageSrc(selectedImage);
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
	const deleteProps = {
		alertTitle: 'Delete Account',
		alertMsg:
			'Deleting your account will permanently remove your profile and quiz.',
		// Close dialog
		handleClose: () => {
			setOpen(false);
		},
		// Delete action
		handleClickDelete: () => {
			dispatch(deleteUserAsync());
		},
	};

	return (
		<div className={classes.setting}>
			<div className={classes.setting__top}>
				<img
					src={imageUrl || loggedUser}
					alt="user_avatar"
					className={classes.setting__user__avatar}
				/>
				<div className={classes.setting__user__action}>
					<div className={classes.setting__button__container}>
						<label htmlFor="contained-button-file">
							<Input
								accept="image/png, image/jpeg"
								id="contained-button-file"
								type="file"
								onChange={handleSelecteImage}
							/>
							<Button
								className={classes.setting__button}
								variant="contained"
								component="span"
							>
								Upload
							</Button>
						</label>
						<Button
							type="button"
							className={classes.setting__button}
							variant="contained"
							onClick={handleSaveAvatar}
						>
							Save
						</Button>
						<AlertDialog open={open} dialogProps={deleteProps} />
					</div>
				</div>
			</div>
			<ChangeUserName />
			{loginMethod === 'email' && <ChangePassword />}
			{loginMethod === 'google' && (
				<section>
					<h3>Change password</h3>
					<p>
						You are logged in with Google or another single sign-on account.
						Your password can not be changed through your Quick Learner account.
					</p>
				</section>
			)}
			<h3>Delete Account</h3>
			<p>By deleting your account you will lose all your data</p>
			<button
				type="button"
				onClick={handleClickOpen}
				className={classes.delete__button}
			>
				Delete Account
			</button>
			<Modal
				open={popOpen}
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
