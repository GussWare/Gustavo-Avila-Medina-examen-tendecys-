const roles = ["admin"];

const roleRights = new Map();
roleRights.set(roles[0], [
	"users_list",
	"users_get_by_id",
	"users_create",
	"users_update",
	"users_delete",
	"users_patch",

	"logs_list",
	"logs_get_by_id",
	"logs_create",

	"aplication_list",
	"aplication_get_by_id",
	"aplication_create",

	"authorization_list",
	"authorization_get_by_id",
	"authorization_create"
]);

export { roles, roleRights };
