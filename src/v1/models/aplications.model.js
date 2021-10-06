import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";

const aplicationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	}   ,
	slug:{
		type: String,
		required: true,
	}
},{
	timestamps: true,
});

// add plugin that converts mongoose to json
aplicationSchema.plugin(toJSONPlugin);

aplicationSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por filtrado avanzado
	if (filter.hasOwnProperty("name")) {
		advancedFilter.push({
			name: filter.name,
		});
	}

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["name"];
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
	let docsPromise = this.find(filterFind).sort(sort).skip(skip).limit(limit);

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
 * @typedef Aplication
 */
 const Aplication = mongoose.model("Aplication", aplicationSchema);

 export default Aplication;