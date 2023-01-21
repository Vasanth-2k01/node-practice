const knex = require("../knex");
const crypto = require("crypto");

exports.seed = async function () {
  let tableName = "employee_group_mapping";
  let hr_group_id = await knex
    .select("id")
    .from("group")
    .where("type", "1")
    .first();
  console.log(hr_group_id.id, "hr_group_id");

  let employee_id = await knex
    .select("id")
    .from("employee")
    .where("email", "vasanth@gmail.com")
    .first();
  console.log(employee_id.id, "hr_group_id");
  let rows = [
    {
      id: crypto.randomUUID(),
      employee_id: employee_id.id,
      group_id: hr_group_id.id,
    },
  ];

  for (let index = 0; index < rows.length; index++) {
    let query = knex(tableName).where("id", rows[index].id);
    let results = await query;
    if (results.length) {
      console.log(`Data already exist in ${tableName} table`);
    } else {
      await knex
        .insert(rows[index])
        .into(tableName)
        .then((res) => {
          console.log(res, "Done");
        });
    }
  }
};
