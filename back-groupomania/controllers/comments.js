const validator = require("validator");
const db = require("../models");
const xss = require("xss");

const Sequelize = require("sequelize");
const initModels = require("../models/init-models").initModels;
const sequelize = require("../models/index").sequelize;
const models = initModels(sequelize);

exports.comment = (req, res) => {};

exports.getOne = (req, res) => {};

exports.updateComment = (req, res) => {};

exports.getAll = (req, res) => {};

exports.deleteComment = (req, res) => {};
