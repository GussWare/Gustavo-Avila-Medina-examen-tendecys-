import * as userFaker from "./user.faker";
import * as logsFaker from "./logs.faker";
import * as aplicationFaker from "./aplication.faker";
import * as authorizationFaker from "./authorization.fake";

const initFaker = async () => {
	await userFaker.userInitFaker();
	await aplicationFaker.aplicationInitFaker();
	await authorizationFaker.authorizationInitFaker();
	await logsFaker.logInitFaker();
};

export default initFaker;
