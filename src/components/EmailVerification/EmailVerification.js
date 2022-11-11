import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signupEmailVerified } from '../../api/sendEmail';

export default function EmailVerification() {
	const { token } = useParams();
	signupEmailVerified(token);
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/signin/verified');
	}, []);
	return <h1>verified</h1>;
}
