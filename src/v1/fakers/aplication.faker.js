import faker from "faker";
import * as aplicationService from "../services/aplication/aplication.service";

export const aplicationInitFaker = async () => {

    await aplicationService.deleteAllAplication();

	await aplicationService.createAplication({
		name: "Usuarios",
		slug: "users"
	});

    await aplicationService.createAplication({
		name: "Roles",
		slug: "roles"
	});

    await aplicationService.createAplication({
		name: "Ventas",
		slug: "ventas"
	});

	return true;
};
