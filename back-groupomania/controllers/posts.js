const fs = require("fs");
const validator = require("validator");
const db = require("../models");
const xss = require("xss");
const date = new Date();

const Sequelize = require("sequelize");
const initModels = require("../models/init-models").initModels;
const sequelize = require("../models/index").sequelize;
const models = initModels(sequelize);

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

exports.createLike = (req, res) => {
  db.likes
    .findOne({
      where: { user_id: req.params.userId, post_id: req.params.postId },
    })
    .then((likes) => {
      if (likes) {
        db.likes
          .destroy({
            where: { user_id: req.params.userId, post_id: req.params.postId },
          })
          .then(() => {
            res.status(200).json({ message: "Like removed from that post !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      } else {
        db.likes
          .create({
            post_id: req.params.postId,
            user_id: req.params.userId,
          })
          .then((like) => {
            res.status(201).json({ message: "This post has been liked !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getLike = (req, res) => {
  const findlikes = models.likes
    .findAll({ where: { post_id: req.params.id } })
    .then((like) => {
      res.status(200).json(like);
    })
    .catch((error) => res.status(500).json(error));
};

exports.getOne = (req, res) => {};

exports.updatePost = (req, res) => {};

exports.getAll = (req, res) => {
  models.posts
    .findAll({
      include: [models.users, models.likes, models.comments],
      order: [["id", "DESC"]],
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(500).json(error));
};

exports.deletePost = (req, res) => {
  const erasePost = db.posts
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.img_url.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        db.posts
          .destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Publications supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
