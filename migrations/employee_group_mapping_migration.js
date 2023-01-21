const knex = require("../knex");

exports.up = function () {
  return knex.schema.createTable("employee_group_mapping", function (table) {
    table.uuid("id").primary();
    table
      .uuid("employee_id")
      .references("id")
      .inTable("employee")
      .onDelete("CASCADE");
    table
      .uuid("group_id")
      .references("id")
      .inTable("group")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function () {
  return knex.schema.dropTable("employee_group_mapping");
};
