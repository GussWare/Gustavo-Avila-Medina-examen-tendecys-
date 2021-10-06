import express from "express";
import * as LogsController from "../controllers/logs.controller";
import * as logsValidation from "../validations/logs.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/logs",
	[auth("logs_list"), validateMiddleware(logsValidation.getPaginate)],
	LogsController.getPaginate
);

router.get(
	"/logs/:userId",
	[auth("logs_get_by_id"), validateMiddleware(logsValidation.userById)],
	LogsController.getLogById
);

router.post(
	"/logs",
	[auth("logs_create"), validateMiddleware(logsValidation.createUser)],
	LogsController.createLog
);

export default router;
