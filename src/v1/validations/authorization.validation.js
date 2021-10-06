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

export const getAuthorizationById = {
	params: Joi.object().keys({
		aplicationId: Joi.string().custom(objectId),
	}),
};

export const createAuthorization = {
	body: Joi.object().keys({
		aplicationId: Joi.string().required(),
        token: Joi.string().required()
	}),
};
