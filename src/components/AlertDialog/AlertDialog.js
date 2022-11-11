import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import classes from './AlertDialog.module.scss';

const useStyles = makeStyles({
	root: {
		borderRadius: '12px',
		margin: '0 10px',
		'& .MuiPaper-root': {
			borderRadius: '12px',
		},
	},
});

export default function AlertDialog({ open, dialogProps }) {
	const { alertTitle, alertMsg, handleClose, handleClickDelete } = dialogProps;
	const muiClasses = useStyles();

	return (
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
				{alertTitle}
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
					{alertMsg}
				</DialogContentText>
			</DialogContent>

			<DialogActions style={{ padding: '15px 23px 25px' }}>
				<Button
					onClick={() => {
						handleClickDelete();
						handleClose();
					}}
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
	);
}
