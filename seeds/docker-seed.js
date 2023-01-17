const knex = require("../knex");
const crypto = require("crypto");

exports.seed = async function () {
  let tableName = "users";
  let rows = [
    {
      id: crypto.randomUUID(),
      first_name: "Vasanth",
      last_name: "M",
    },
    {
      id: crypto.randomUUID(),
      first_name: "Singam",
      last_name: "M",
    },
  ];

  for (let index = 0; index < rows.length; index++) {
    let query = knex(tableName)
      .where("id", rows[index].id)
      .andWhere("first_name", rows[index].first_name.trim())
      .andWhere("last_name", rows[index].last_name.trim());
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

  tableName = "products";
  rows = [
    { id: crypto.randomUUID(), name: "Mobiles", price: 10000 },
    { id: crypto.randomUUID(), name: "TV", price: 20000 },
  ];

  for (index = 0; index < rows.length; index++) {
    let query = knex(tableName)
      .where("id", rows[index].id)
      .andWhere("name", rows[index].name.trim())
      .andWhere("price", rows[index].price);

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

  tableName = "employee";
  rows = [
    {
      id: crypto.randomUUID(),
      name: "Vasanth",
      surname: "M",
      email: "vasanth@gmail.com",
      image: "bro.svg",
    },
  ];

  for (index = 0; index < rows.length; index++) {
    let query = knex(tableName)
      .where("id", rows[index].id)
      .andWhere("name", rows[index].name.trim())
      .andWhere("surname", rows[index].surname.trim())
      .andWhere("email", rows[index].email.trim());

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
