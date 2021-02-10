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
  (date.getHours() + 1) +
  ":" +
  date.getMinutes() +
  ":" +
  date.getSeconds();
//====> Ajoute une publication <====\\
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
      content: xss(postObject.content),
      created_at: currentDate,
      updated_at: currentDate,
      title: xss(postObject.title),
    });
    res.status(200).json({ message: "Publication enregistrée !" });
  }
};

//====> Mettre à jour une publication<====\\
exports.updatePost = (req, res) => {
  let postMod = {};
  let parsedPost = {
    ...JSON.parse(req.body.post),
  };
  let regex = /[\|\/\\\*\+&#\{\(\[\]\}\)<>€£$%=\^`]/;
  if (req.file) {
    console.log("file présente");
    db.posts
      .findOne({ where: { id: parsedPost.postId } })
      .then((post) => {
        console.log(post.img_url);
        const filename = post.img_url.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
        postMod = {
          ...JSON.parse(req.body.post),
          img_url: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        if (validator.matches(postMod.title, regex)) {
          res
            .status(422)
            .json({ message: "Wrong format do not use specials characters" });
        }
      })
      .then(() => {
        db.posts.update(
          {
            img_url: postMod.img_url,
            title: xss(postMod.title),
            content: xss(postMod.content),
            updated_at: currentDate,
          },
          { where: { id: parsedPost.postId } }
        );
      })
      .then(() => {
        res.status(200).json({ message: "Publication modifiée !" });
      });
  } else {
    console.log("file non présente");
    if (validator.matches(parsedPost.title, regex)) {
      res
        .status(422)
        .json({ message: "Wrong format do not use specials characters" });
    }
    db.posts
      .update(
        {
          title: xss(parsedPost.title),
          content: xss(parsedPost.content),
          updated_at: currentDate,
        },
        { where: { id: parsedPost.postId } }
      )
      .then(() => {
        res.status(200).json({ message: "Publication modifiée !" });
      });
  }
};

//====> Récupère toutes les publications<====\\
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
//====> Efface une publication <====\\
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
/*====> Ajoute un like à la publication
        ou le supprime si l'utilisateur a déja liké<====*/
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
//====> Récupère les likes d'une publication <====\\
exports.getLike = (req, res) => {
  const findlikes = models.likes
    .findAll({ where: { post_id: req.params.id } })
    .then((like) => {
      res.status(200).json(like);
    })
    .catch((error) => res.status(500).json(error));
};
//====> Ajoute un commentaire à une publication<====\\
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
//====> Supprime le commentaire d'un publication <====\\
exports.deleteComment = (req, res) => {
  const eraseComment = db.comments
    .destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "Commentaire supprimé !" });
    })
    .catch((error) => req.status(500).json(error));
};
//====> Récupère les commantaires d'une publication <====\\
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
