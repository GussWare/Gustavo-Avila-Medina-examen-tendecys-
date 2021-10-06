import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";

const authorizationsSchema = new mongoose.Schema({
	aplicationId: {
        type: mongoose.Schema.Types.ObjectId, ref:'Aplication',
		required: true
	},
    token: String   
},{
    timestamps: true,
});

// add plugin that converts mongoose to json
authorizationsSchema.plugin(toJSONPlugin);

authorizationsSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por filtrado avanzado
	if (filter.hasOwnProperty("token")) {
		advancedFilter.push({
			token: filter.token,
		});
	}

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["token"];
		searchFilter = paginationHelper.search(options.search, columns);

		if (searchFilter.length > 0) {
			filterFind["$or"] = searchFilter;
		}
	}

	const sort = paginationHelper.sortBy(options.sortBy);
	const limit = paginationHelper.limit(options.limit);
	const page = paginationHelper.page(options.page);
	const skip = paginationHelper.skip(page, limit);

	const countPromise = this.countDocuments(filterFind).exec();
	let docsPromise = this.find(filterFind).populate("aplicationId").sort(sort).skip(skip).limit(limit);

	if (options.populate) {
		options.populate.split(",").forEach((populateOption) => {
			docsPromise = docsPromise.populate(
				populateOption
					.split(".")
					.reverse()
					.reduce((a, b) => ({ path: b, populate: a }))
			);
		});
	}

	docsPromise = docsPromise.exec();

	return Promise.all([countPromise, docsPromise]).then((values) => {
		const [totalResults, results] = values;
		const totalPages = Math.ceil(totalResults / limit);
		const result = {
			results,
			page,
			limit,
			totalPages,
			totalResults,
		};

		return Promise.resolve(result);
	});
};

/**
 * @typedef Authorization
 */
 const Authorization = mongoose.model("Authorization", authorizationsSchema);

 export default Authorization;