import LogModel from "../../models/logs.model";

export const getPaginate = async (filter, options) => {
	const pagination = await LogModel.paginate(filter, options);
	return pagination;
};

export const getLogs = async () => {
	const logs = await LogModel.find();
	return logs;
};

export const getLogById = async (id) => {
	const log = await LogModel.findById(id);
	return log;
};

export const createLog = async (createBody) => {
	const log = await LogModel.create(createBody);
	return log;
};