const knex = require("../knex");

exports.up = function () {
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").primary();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
    })
    .createTable("products", function (table) {
      table.uuid("id").primary();
      table.string("name", 255).notNullable();
      table.decimal("price").notNullable();
    })
    .createTable("employee", function (table) {
      table.uuid("id").primary();
      table.string("name", 255).notNullable();
      table.string("surname", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("image", 500).notNullable();
    });
};

exports.down = function () {
  return knex.schema
    .dropTable("users")
    .dropTable("products")
    .dropTable("employee");
};
