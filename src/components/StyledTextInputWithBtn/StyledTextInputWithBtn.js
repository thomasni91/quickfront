import React, { useState } from 'react';
import './StyledTextInputWithBtn.scss';

function StyledTextInputWithBtn({
	placeholder,
	buttonName,
	handleSubmit,
	animation,
}) {
	const [inputValue, setInputValue] = useState('');

	const handleSubmitBtn = async (value, e) => {
		e.preventDefault();
		await handleSubmit(value);
	};
	return (
		<form className={animation ? 'form form__animation' : 'form'}>
			<div className="form__container">
				<input
					type="text"
					placeholder={placeholder}
					className="form__input"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					type="submit"
					className="form__btn"
					onClick={(e) => handleSubmitBtn(inputValue, e)}
				>
					{buttonName}
				</button>
			</div>
		</form>
	);
}

export default StyledTextInputWithBtn;
