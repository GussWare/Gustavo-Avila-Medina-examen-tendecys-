import httpStatus from "http-status";
import * as authorizationService from "../services/authorization/authorization.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["authorizationname", "email"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await authorizationService.getPaginate(filter, options);

	res.send(response);
});

export const getLogById = catchAsyncHelper(async (req, res) => {
	const authorization = await authorizationService.getAuthorizationById(req.params.authorizationId);

	if (!authorization) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ authorization });
});

export const createLog = catchAsyncHelper(async (req, res) => {
	const authorization = await authorizationService.createAuthorization(req.body);
	res.send({ authorization });
});