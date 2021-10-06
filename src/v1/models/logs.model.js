import mongoose from "mongoose";
import validator from "validator";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";

const logsSchema = new mongoose.Schema({
	aplicationId: {
        type: mongoose.Schema.Types.ObjectId, ref:'Aplication',
		required: true
	},
    type: {
        type:String,
        enum:[
            "error", "info", "warning"
        ]
    },
    priority: {
        type: String,
        enum:['lowest', 'low', 'medium', 'high', 'highest']
    },
    path:{
        type:String
    } ,
    message:{
        type:String
    },
    request:{
        type:Object
    },
    response:{
        type:Object
    }
},{
    timestamps: true,
});

// add plugin that converts mongoose to json
logsSchema.plugin(toJSONPlugin);

logsSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por filtrado avanzado
	if (filter.hasOwnProperty("aplication_id")) {
		advancedFilter.push({
			aplication_id: filter.aplication_id,
		});
	}

	if (filter.hasOwnProperty("type")) {
		advancedFilter.push({
			type: filter.type,
		});
	}

    if (filter.hasOwnProperty("priority")) {
		advancedFilter.push({
			priority: filter.priority,
		});
	}

	if (advancedFilter.length > 0) {
		filterFind["$and"] = advancedFilter;
	}

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["aplication_id", "type", "priority"];
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
 * @typedef Logs
 */
 const Logs = mongoose.model("Logs", logsSchema);

 export default Logs;