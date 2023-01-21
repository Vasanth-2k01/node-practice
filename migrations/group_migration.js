const knex = require("../knex");

exports.up = function () {
  return knex.schema.createTable("group", function (table) {
    table.uuid("id").primary();
    table.integer("type").primary();
    table.string("name", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function () {
  return knex.schema.dropTable("group");
};
