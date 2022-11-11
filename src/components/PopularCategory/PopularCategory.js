import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './PopularCategory.module.scss';
import { getPopularQuizType } from '../../features/quizType/createQuizTypeSlice';
import Loading from '../Loading/Loading';

function PopularCategory() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const handleLink = () => {
	// 	navigate('/admin/explore');
	// };
	const { popularType, loading } = useSelector((state) => state.quizType);
	useEffect(() => {
		dispatch(getPopularQuizType());
	}, []);

	return (
		<section className={`${classes['popular-container']}`}>
			{loading ? (
				<Loading />
			) : (
				(popularType?.length > 0 && (
					<>
						<ul>
							{popularType.map((type) => (
								<li
									key={type._id}
									onClick={() => {
										navigate(
											`popular-category/${type.quiztype[0].name}/${type._id}`,
										);
									}}
								>
									<h2>{type.quiztype[0]?.name}</h2>
									<small>{type.count} Quizs</small>
								</li>
							))}
						</ul>
						{/* <>
							<Button
								type="button"
								className={classes.login__back}
								onClick={handleLink}
								style={{
									color: '#fcc822',
									display: 'flex',
									flexDirection: 'column',
									padding: '0',
									marginLeft: '5px',
									minWidth: '55px',
								}}
							>
								<FontAwesomeIcon icon={faArrowRight} size="2x" />
								<p>See More</p>
							</Button>
						</> */}
					</>
				)) || <h2>No data avaliable, please try again!</h2>
			)}
		</section>
	);
}

export default PopularCategory;
