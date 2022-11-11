import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import Delete from '../../assets/delete.png';
import {
	deleteQuizByID,
	deleteQuizInQuizzes,
} from '../../features/quiz/quizSlice';
import { loadNotification } from '../../features/notification/notificationSlice';
import classes from './MyquizDelete.module.scss';

const useStyles = makeStyles({
	root: {
		borderRadius: '12px',
		margin: '0 10px',
		'& .MuiPaper-root': {
			borderRadius: '12px',
		},
	},
});

export default function ResponsiveDialog({ quizId }) {
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const muiClasses = useStyles();
	const success = useSelector((state) => state.quiz.success);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = async () => {
		await dispatch(deleteQuizByID({ quizId }));
		if (success) {
			dispatch(
				loadNotification({
					message: ' This quiz is deleted successfully',
					type: 'success',
					visible: true,
				}),
			);
			dispatch(deleteQuizInQuizzes(quizId));
		}
	};

	return (
		<>
			<Button
				className={classes.quizDetailCard__button}
				onClick={handleClickOpen}
				style={{
					width: '30px',
					minWidth: '30px',
					background: 'white',
				}}
			>
				<img className={classes.quizDetailCard__edit} src={Delete} alt="edit" />
			</Button>
			<Dialog
				className={muiClasses.root}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					style={{
						color: 'white',
						backgroundColor: '#ffcd2e',
						padding: '10px 24px 10px 39px',
						fontWeight: '700',
						fontFamily: 'Poppins',
					}}
					id="responsive-dialog-title"
				>
					Quiz Delete
				</DialogTitle>

				<DialogContent style={{ paddingTop: '30px' }}>
					<DialogContentText
						className={classes.title}
						id="alert-dialog-description"
						style={{
							color: '#909090',
							fontFamily: 'Poppins',
						}}
					>
						Are you sure you want to delete？
					</DialogContentText>
				</DialogContent>

				<DialogActions style={{ padding: '15px 23px 25px' }}>
					<Button
						// autoFocus
						onClick={handleDelete}
						style={{
							color: 'white',
							backgroundColor: '#ffcd2e',
							borderRadius: '1px',
							padding: '2px',
							fontWeight: '700',
						}}
					>
						Yes
					</Button>
					<Button
						onClick={handleClose}
						style={{
							color: '#ffcd2e',
							border: '1px solid #FFCC2C',
							borderRadius: '1px',
							padding: '2px',
							fontWeight: '700',
						}}
						autoFocus
					>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
