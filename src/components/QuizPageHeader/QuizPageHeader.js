import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react';
import { logout } from '../../features/login/loginSlice';
import brainCellLogo from '../../assets/brainCellLogo.png';
import userImage from '../../assets/user-image.png';
import './QuizPageHeader.scss';
import { cleanUser } from '../../features/user/userSlice';

function QuizPageHeader() {
	const [click, setClick] = useState(false);
	const user = useSelector((state) => state.login.user);
	const isLogin = useSelector((state) => state.login.isLogin);
	const handleClick = () => setClick(!click);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<section className="quiz__container">
			<div className="header__logo-area">
				<img src={brainCellLogo} alt="brainCellLogo" />
				<span>Quick Learner</span>
			</div>
			<div className="header__logout-area">
				<div className="menu-icon" onClick={handleClick}>
					<FontAwesomeIcon icon={click ? faTimes : faBars} />
				</div>
				<div className={click ? 'header__nav-menu active' : 'header__nav-menu'}>
					<img src={userImage} alt="userImage" />
					<span>{isLogin ? user : 'Braincell'}</span>
					<Button
						variant="outlined"
						startIcon={<LogoutIcon />}
						onClick={() => {
							dispatch(logout());
							dispatch(cleanUser());
							if (!isLogin) {
								navigate('/');
							}
						}}
					>
						Sign Out
					</Button>
				</div>
			</div>
		</section>
	);
}
export default QuizPageHeader;
