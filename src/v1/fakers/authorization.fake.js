import faker from "faker";
import * as authorizationService from "../services/authorization/authorization.service";
import * as logsAppHelper from "../helpers/logs.helper"

export const authorizationInitFaker = async () => {
    await authorizationService.deleteAllAuthorization();

	await authorizationService.createAuthorization({
		aplicationId: await logsAppHelper.getAplicationRandom(),
		token:faker.lorem.words()
	});

    await authorizationService.createAuthorization({
		aplicationId: await logsAppHelper.getAplicationRandom(),
		token: faker.lorem.words()
	});

    await authorizationService.createAuthorization({
		aplicationId: await logsAppHelper.getAplicationRandom(),
		token: faker.lorem.words()
	});

	return true;
};
