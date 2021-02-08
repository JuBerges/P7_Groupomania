const fs = require("fs");
const validator = require("validator");
const db = require("../models");
const xss = require("xss");
const date = new Date();

const Sequelize = require("sequelize");
const initModels = require("../models/init-models").initModels;
const sequelize = require("../models/index").sequelize;
const { json } = require("sequelize");
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
      fs.unlink(`images/${filename}`, () => {});
    })
    .then(() => {
      db.likes.destroy({ where: { post_id: req.params.id } });
    })
    .then(() => {
      db.comments.destroy({ where: { post_id: req.params.id } });
    })
    .then(() => {
      db.posts
        .destroy({ where: { id: req.params.id } })
        .then(() =>
          res.status(200).json({ message: "Publications supprimée !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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

exports.createComment = (req, res) => {
  let regex = /[\|\/\\\*\+&#\{\(\[\]\}\)<>€£$%=\^`]/;
  console.log(req.body.postId + " / " + req.body.comment);
  if (validator.matches(req.body.comment, regex)) {
    res
      .status(422)
      .json({ message: "Wrong format do not use specials characters" });
  } else {
    const post = db.comments.create({
      comment: xss(req.body.comment),
      post_id: req.body.postId,
      user_id: req.body.userId,
      created_at: currentDate,
    });
    res.status(200).json({ message: "Commentaire enregistrée !" });
  }
};

exports.deleteComment = (req, res) => {
  const eraseComment = db.comments
    .destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "Commentaire supprimé !" });
    })
    .catch((error) => req.status(500).json(error));
};

exports.getComments = (req, res) => {
  models.comments
    .findAll({
      where: { post_id: req.params.postId },
      include: [models.users],
      order: [["id", "ASC"]],
    })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(500).json(error));
};
