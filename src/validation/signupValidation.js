import Joi from 'joi';

const signupSchema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
		.label('Email')
		.messages({
			'string.empty': `Email cannot be an empty field`,
			'any.required': `Email is a required field`,
			'string.email': `Email must be a valid email`,
		}),
	password: Joi.string()
		.$.min(8)
		.max(16)
		.rule({ message: 'Password must be between 8 and 16' })
		.required()
		.label('Password')
		.messages({
			'string.empty': `Password cannot be an empty field`,
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is a required field`,
		}),
	confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
		'any.only': `Password must match`,
	}),
});

export default signupSchema;
