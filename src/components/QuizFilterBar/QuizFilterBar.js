import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import StyledSelectMenu from '../StyledSelectMenu/StyledSelectMenu';
import classes from './QuizFilterBar.module.scss';
import { fetchQuizType } from '../../features/quizType/createQuizTypeSlice';
import { fetchAllQuiz, filterQuiz } from '../../features/quiz/quizSlice';

const times = ['All', 'Less than 20min', '20-40min', 'More than 40 min'];
const difficulties = ['All', 'Hard', 'Medium', 'Easy'];
function QuizFilterBar() {
	const dispatch = useDispatch();
	const tagList = useSelector((state) => state.quizType.quizType);
	const categories = Array.from(
		new Set(['All'].concat(tagList.map((tag) => tag.name))),
	);
	const [filtertag, setFiltertag] = React.useState(false);
	const [filters, setFilters] = React.useState({
		Time: 'All',
		Difficulty: 'All',
		Category: 'All',
	});
	React.useEffect(() => {
		dispatch(fetchQuizType());
		dispatch(fetchAllQuiz());
		dispatch(filterQuiz(filters));
	}, []);
	React.useEffect(() => {
		if (filtertag) {
			dispatch(filterQuiz(filters));
		}
	}, [filters]);
	const handleFilterChange = (event) => {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<div className={classes.QuizFilterBarContainer}>
			<div className={classes.QuizFilterBar}>
				<div className={classes.Filtertags}>
					<li className={classes.Filtertag}>
						<StyledSelectMenu
							options={times}
							title="Time"
							value={filters.Time}
							onChange={handleFilterChange}
						/>
					</li>
					<li className={classes.Filtertag}>
						<StyledSelectMenu
							options={categories}
							title="Category"
							value={filters.Category}
							className={classes.Filtertag}
							onChange={handleFilterChange}
						/>
					</li>
					<li className={classes.Filtertag}>
						<StyledSelectMenu
							options={difficulties}
							title="Difficulty"
							value={filters.Difficulty}
							className={classes.Filtertag}
							onChange={handleFilterChange}
						/>
					</li>
				</div>
				<div className={classes.Apply_clear}>
					<button
						className={classes.ApplyFilterBtn}
						type="submit"
						onClick={() => {
							setFiltertag(true);
							dispatch(filterQuiz(filters));
						}}
					>
						Apply Filter
					</button>
					<button
						className={classes.ClearFilterBtn}
						type="button"
						onClick={() => {
							setFiltertag(false);
							setFilters({
								Time: 'All',
								Difficulty: 'All',
								Category: 'All',
							});
						}}
					>
						Clear Filter
					</button>
				</div>
			</div>
			<div className={classes.FiltertagBtns}>
				{Object.entries(filters).map(([key, value]) => {
					if (value === 'All') {
						return '';
					}
					return (
						<button
							className={classes.FiltertagBtn}
							type="submit"
							key={key}
							style={{ display: filtertag ? '' : 'none' }}
						>
							{value}
							<CloseIcon
								className={classes.closeBtn}
								onClick={() => {
									setFilters({
										...filters,
										[key]: 'All',
									});
								}}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
}
export default QuizFilterBar;
