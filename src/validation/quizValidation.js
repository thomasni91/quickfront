import Joi from 'joi';

const quizSchema = Joi.object({
	name: Joi.string().min(1).max(30).required(),
	grade: Joi.number().integer().min(0).max(999).required(),
	timeLimit: Joi.number().integer().min(0).max(999).optional(),
	description: Joi.string().min(0).max(150).optional(),
	difficulty: Joi.string().min(4).max(150).required(),
});

export default quizSchema;
