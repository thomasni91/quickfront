import Joi from 'joi';

const changePasswordSchema = Joi.object({
	password: Joi.string()
		.$.min(8)
		.max(16)
		.rule({ message: 'Password must be between 8 and 16' })
		.required()
		.label('Password')
		.invalid(Joi.ref('oldPassword'))
		.messages({
			'string.empty': `Password cannot be an empty field`,
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is a required field`,
			'any.invalid': 'New password can not be your old password',
		}),
	confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
		'any.only': `Password must match`,
	}),
	oldPassword: Joi.string()
		.$.min(8)
		.max(16)
		.rule({ message: 'Password must be between 8 and 16' })
		.label('OldPassword')
		.required()
		.messages({
			'string.empty': `Password cannot be an empty field`,
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is a required field`,
		}),
});

export default changePasswordSchema;
