require("dotenv").config();
const environment = "development";
const knex = require("knex");
const config = require("./knexfile");
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
