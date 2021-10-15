import faker from "faker";
import * as logsAppHelper from "../helpers/logs.helper";
import * as LogService from "../services/logss/logs.service";

export const logInitFaker = async () => {

    for (let i = 0; i < 10; i++) {
            let aplicationId = await logsAppHelper.getAplicationRandom();
            let type = await logsAppHelper.getTypeRandom();
            let priority = await logsAppHelper.getPriorityRandom();

			let data = {
				aplicationId: aplicationId,
				type: type,
				priority:priority,
				path: faker.image.imageUrl(),
				message: faker.lorem.sentence(),
				request: {
					value1: faker.lorem.sentence(),
					value2: faker.lorem.sentence(),
				},
				response: {
					res1: faker.lorem.sentence(),
					res2: faker.lorem.sentence(),
				},
			};

			await LogService.createLog(data);
		}
	
    return true;
};