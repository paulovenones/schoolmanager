const { Pool } = require("pg");

module.exports = new Pool({
	user: "paulo",
	password: "amine2005",
	host: "localhost",
	port: 5432,
	database: "my_teacher",
});
