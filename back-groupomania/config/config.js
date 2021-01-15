const fs = require("fs");
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  test: {},
  production: {},
};
