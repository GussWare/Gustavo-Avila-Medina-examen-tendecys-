import Joi from "joi";
import { password, objectId } from "./custom.validation";


export const getPaginate = {
	query: Joi.object().keys({
		name: Joi.string(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getAplicationById = {
	params: Joi.object().keys({
		aplicationId: Joi.string().custom(objectId),
	}),
};

export const createAplication = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		slug: Joi.string().required(),
	}),
};
