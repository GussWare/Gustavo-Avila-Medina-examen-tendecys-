import AuthorizationModel from "../../models/authorizations.model";

export const getPaginate = async (filter, options) => {
	const pagination = await AuthorizationModel.paginate(filter, options);
	return pagination;
};

export const getAuthorizations = async () => {
	const authorization = await AuthorizationModel.find();
	return authorization;
};

export const getAuthorizationById = async (id) => {
	const authorization = await AuthorizationModel.findById(id);
	return authorization;
};

export const createAuthorization = async (createBody) => {
	const authorization = await AuthorizationModel.create(createBody);
	return authorization;
};

export const updateAuthorization = async (id, updateBody) => {
	const authorization = await getAuthorizationById(id);

	if (!authorization) {
		return null;
	}

	Object.assign(authorization, updateBody);

	const authorizationUpdated = await authorization.save();
	return authorizationUpdated;
};

export const deleteAuthorization = async (id) => {
	const authorization = await getAuthorizationById(id);

	if (!authorization) {
		return null;
	}

	await AuthorizationModel.remove({
		_id:id
	});

	return authorization;
};


export const deleteAllAuthorization = async (id) => {
	
	return await AuthorizationModel.remove();

};