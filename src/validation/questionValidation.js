import Joi from 'joi';

export const questionSchema = Joi.object({
	id: Joi.string().required(),
	title: Joi.string().required(),
	choices: Joi.array().required(),
	correctAnswer: Joi.array().required(),
	type: Joi.string().min(1).max(20).required(),
	answerOptions: Joi.array().required(),
});

export const questionEditSchema = Joi.object({
	creator: Joi.string().required(),
	id: Joi.string().required(),
	title: Joi.string().required(),
	choices: Joi.array().required(),
	correctAnswer: Joi.array().required(),
	type: Joi.string().min(1).max(20).required(),
	answerOptions: Joi.array().required(),
});
