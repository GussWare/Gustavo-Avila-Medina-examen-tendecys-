import express from "express";
import * as LogsController from "../controllers/authorization.controller";
import * as authorizationValidation from "../validations/authorization.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/authorization",
	[auth("authorization_list"), validateMiddleware(authorizationValidation.getPaginate)],
	LogsController.getPaginate
);

router.get(
	"/authorization/:userId",
	[auth("authorization_get_by_id"), validateMiddleware(authorizationValidation.getAuthorizationById)],
	LogsController.getLogById
);

router.post(
	"/authorization",
	[auth("authorization_create"), validateMiddleware(authorizationValidation.createAuthorization)],
	LogsController.createLog
);

export default router;
