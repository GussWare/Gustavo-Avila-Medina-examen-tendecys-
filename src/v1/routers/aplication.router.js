import express from "express";
import * as AplicationsController from "../controllers/aplication.controller";
import * as aplicationValidation from "../validations/aplication.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/aplication",
	[auth("aplication_list"), validateMiddleware(aplicationValidation.getPaginate)],
	AplicationsController.getPaginate
);

router.get(
	"/aplication/:aplicationId",
	[auth("aplication_get_by_id"), validateMiddleware(aplicationValidation.getAplicationById)],
	AplicationsController.getAplicationById
);

router.post(
	"/aplication",
	[auth("aplication_create"), validateMiddleware(aplicationValidation.createAplication)],
	AplicationsController.createAplication
);

export default router;
