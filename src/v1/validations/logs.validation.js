import Joi from "joi";
import { password, objectId } from "./custom.validation";


export const getPaginate = {
	query: Joi.object().keys({
		aplication_id: Joi.string(),
		type: Joi.string(),
		priority: Joi.string(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getLogById = {
	params: Joi.object().keys({
		logId: Joi.string().custom(objectId),
	}),
};

export const createLog = {
	body: Joi.object().keys({
		aplication_id: Joi.string().required(),
        type: Joi.string().required(),
        priority: Joi.string().required(),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.object().required(),
        response: Joi.object().required(),
	}),
};
