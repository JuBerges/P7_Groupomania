const fs = require("fs");
const validator = require("validator");
const models = require("../models");
const xss = require("xss");
const date = new Date();
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
  let regex = /[\|\/\\\*\+&#\{\(\[\]\}\)<>€£$%=\^`]/;
  if (!req.file) {
    res.status(400).json({ message: "Form file required" });
  } else if (validator.matches(req.body.title, regex)) {
    res
      .status(422)
      .json({ message: "Wrong format do not use specials characters" });
  } else {
    const post = models.posts.create({
      user_id: req.body.userId,
      img_url: req.body.imgUrl,
      created_at: currentDate,
      updated_at: currentDate,
      title: req.body.title,
    });
    console.log(post);
  }
};

exports.createLike = (req, res) => {};

exports.getLike = (req, res) => {};

exports.getOne = (req, res) => {};

exports.updatePost = (req, res) => {};

exports.getAll = (req, res) => {};

exports.deletePost = (req, res) => {};
