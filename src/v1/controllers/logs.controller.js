import httpStatus from "http-status";
import * as logService from "../services/logs/logs.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["logname", "email"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await logService.getPaginate(filter, options);

	res.send(response);
});

export const getLogById = catchAsyncHelper(async (req, res) => {
	const log = await logService.getLogById(req.params.logId);

	if (!log) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ log });
});

export const createLog = catchAsyncHelper(async (req, res) => {
	const log = await logService.createLog(req.body);
	res.send({ log });
});