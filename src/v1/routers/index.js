import express from "express";
import userRoute from "./user.rooter";
import authRoute from "./auth.router";
import logsRoute from "./logs.router";
import testRoute from "./test.router";
import aplicationRoute from "./aplication.router";
import authorizationRoute from "./authorization.router";
import config from "../config/vars.config";
import constants from "../config/vars.config";

const router = express.Router();

const defaultRoutes = [
	{
		path: "/v1",
		route: userRoute,
	},
	{
		path: "/v1",
		route: authRoute,
	},
	{
		path: "/v1",
		route: logsRoute,
	},
	{
		path: "/v1",
		route: aplicationRoute,
	},
	{
		path: "/v1",
		route: authorizationRoute,
	},
	{
		path: "/v1",
		route: testRoute,
	}
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});


export default router;
