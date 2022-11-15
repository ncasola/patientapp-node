"use strict";
module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    dialect: "mariadb",
    dialectOptions: {
      ssl: true,
    },
  },
};