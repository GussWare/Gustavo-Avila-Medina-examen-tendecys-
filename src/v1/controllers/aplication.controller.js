import httpStatus from "http-status";
import catchAsyncHelper from "../helpers/catch.async.helper";
import * as aplicationService from "../services/aplication/aplication.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, []);
	const options = pickHelper(req.query, ["sortBy", "limit", "page"]);

	const response = await aplicationService.getPaginate(filter, options);

	res.send(response);
});

export const getAplication = catchAsyncHelper(async (req, res) => {
	const aplication = await aplicationService.getAplication();
	res.send({ aplication });
});

export const getAplicationById = catchAsyncHelper(async (req, res) => {
	const aplication = await aplicationService.getAplicationById(req.params.aplicationId);

	if (!aplication) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ aplication });
});

export const createAplication = catchAsyncHelper(async (req, res) => {
	const aplication = await aplicationService.createAplication(req.body);
	res.send({ aplication });
});

export const updateAplication = catchAsyncHelper(async (req, res) => {
	const aplication = await aplicationService.updateAplication(req.params.aplicationId, req.body);

	if (!aplication) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ aplication });
});

export const deleteAplication = catchAsyncHelper(async (req, res) => {
	const aplication = await aplicationService.deleteAplication(req.params.aplicationId);

	if (!aplication) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ aplication });
});
