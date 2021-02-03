const fs = require("fs");
const validator = require("validator");
const db = require("../models");
const xss = require("xss");
const date = new Date();
const Sequelize = require("sequelize");

const currentDate =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getDate() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes() +
  ":" +
  date.getSeconds();

exports.createPost = (req, res) => {
  const postObject = {
    ...JSON.parse(req.body.post),
    img_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  console.log(postObject.userId);
  let regex = /[\|\/\\\*\+&#\{\(\[\]\}\)<>€£$%=\^`]/;
  if (!req.file) {
    res.status(400).json({ message: "Form file required" });
  } else if (validator.matches(postObject.title, regex)) {
    res
      .status(422)
      .json({ message: "Wrong format do not use specials characters" });
  } else {
    const post = db.posts.create({
      user_id: postObject.userId,
      img_url: postObject.img_url,
      created_at: currentDate,
      updated_at: currentDate,
      title: xss(postObject.title),
    });
    res.status(200).json({ message: "Publication enregistrée !" });
  }
};

exports.createLike = (req, res) => {};

exports.getLike = (req, res) => {};

exports.getOne = (req, res) => {};

exports.updatePost = (req, res) => {};

exports.getAll = (req, res) => {
  db.posts
    .findAll({
      include: [],
      order: [["created_at", "DESC"]],
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(500).json(error));
};

exports.deletePost = (req, res) => {};
