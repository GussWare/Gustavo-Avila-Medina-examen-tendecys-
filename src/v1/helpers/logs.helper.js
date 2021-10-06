import * as AplicationService  from "../services/aplication/aplication.service";
import loggerHelper from "./logger.helper";

export const getAplicationRandom = async() => {
    const aplications = await AplicationService.getAplications();
    const module = aplications[Math.floor(Math.random() * aplications.length)];
    const aplicationId = module._id;

    loggerHelper.debug("APLICATION_ID");
    loggerHelper.debug(aplicationId)

    return aplicationId;
};

export const getTypeRandom = async() => {
    const types = ["error", "info", "warning"];
    const type = types[Math.floor(Math.random() * types.length)];

    loggerHelper.debug("TYPE");
    loggerHelper.debug(type)

    return type;
};

export const getPriorityRandom = async() => {
    const priorities = ['lowest', 'low', 'medium', 'high', 'highest'];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];

    loggerHelper.debug("PRIORITY");
    loggerHelper.debug(priority)

    return priority;
};