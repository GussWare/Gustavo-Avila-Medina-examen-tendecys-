import AplicationModel from "../../models/aplications.model";

export const getPaginate = async (filter, options) => {
	const pagination = await AplicationModel.paginate(filter, options);
	return pagination;
};

export const getAplications = async () => {
	const aplication = await AplicationModel.find();
	return aplication;
};

export const getAplicationById = async (id) => {
	const aplication = await AplicationModel.findById(id);
	return aplication;
};

export const createAplication = async (createBody) => {
	const aplication = await AplicationModel.create(createBody);
	return aplication;
};

export const updateAplication = async (id, updateBody) => {
	const aplication = await getAplicationById(id);

	if (!aplication) {
		return null;
	}

	Object.assign(aplication, updateBody);

	const aplicationUpdated = await Aplication.save();
	return aplicationUpdated;
};

export const deleteAplication = async (id) => {
	const aplication = await getAplicationById(id);

	if (!aplication) {
		return null;
	}

	await aplication.remove({
		_id:id
	});

	return aplication;
};

export const deleteAllAplication = async (id) => {
	return await AplicationModel.remove();
};
