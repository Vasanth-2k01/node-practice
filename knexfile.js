require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "nuxt-with-node",
      user: "postgres",
      password: "postgres",
      charset: "utf8",
      pool: {
        min: 2,
        max: 10,
      },
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
