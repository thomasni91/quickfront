import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './MyQuizListView.module.scss';
import Pencil from '../../assets/Pencil.png';
import ResponsiveDialog from '../MyquizDelete/MyquizDelete';

function MyQuizListView({ uploadedQuizData }) {
	const formatDate = (date) => {
		const day = new Date(date).getDate();
		const month = new Date(date).toLocaleString('default', { month: 'short' });
		const year = new Date(date).getFullYear();
		return `${day} ${month} ${year}`;
	};
	const navigate = useNavigate();
	const handleEdit = (id) => {
		navigate(`/admin/quiz-edit/${id}`);
	};
	return (
		<div className={classes.myQuiz__content}>
			{uploadedQuizData.length !== 0 && (
				<div className={classes.myQuiz__contentTitle}>
					<h3 className={classes.myQuiz__title}>Published</h3>
				</div>
			)}
			<div className={classes.myQuiz__tableWrapper}>
				{uploadedQuizData.length !== 0 && (
					<table className={classes.myQuiz__table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Join Code</th>
								<th>Question Numer</th>
								<th>Created At</th>
								<th>Operation</th>
							</tr>
						</thead>
						<tbody>
							{uploadedQuizData.map((item) => (
								<tr key={`uploaded-${item._id}`}>
									<td>{item.name}</td>
									<td>
										{item.referralCode ? item.referralCode.code : 'No Data'}
									</td>
									<td>{item.questions.length}</td>
									<td>{formatDate(item.date)}</td>
									<td>
										<div className={classes.myQuiz__buttons}>
											<button
												onClick={() => handleEdit(item._id)}
												className={classes.myQuiz__button}
												type="button"
											>
												<img
													className={classes.myQuiz__edit}
													src={Pencil}
													alt="edit"
												/>
											</button>
											<ResponsiveDialog quizId={item._id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

export default MyQuizListView;
