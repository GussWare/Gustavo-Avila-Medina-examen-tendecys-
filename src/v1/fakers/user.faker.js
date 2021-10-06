import faker from "faker";
import * as userService from "../services/users/user.service";

export const userInitFaker = async () => {
	
	await userService.deleteAllUser();
	
	const userAdmin = await userService.createUser({
		name: "Gustavo",
		surname: "Avila Medina",
		username: "gussware",
		email: "gussware@gmail.com",
		password: "123qweAA",
		repeatPassword: "123qweAA",
		role: "admin",
		enabled:true
	});

	return true;
};
