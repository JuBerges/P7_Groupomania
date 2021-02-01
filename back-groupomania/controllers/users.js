const bcrypt = require("bcryptjs");
const fs = require("fs");
const validator = require("validator");
const passwordValidator = require("password-validator");
const models = require("../models");
const xss = require("xss");
const jwt = require("jsonwebtoken");

const schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

exports.signup = (req, res) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...JSON.parse(req.body.user),
        avatar: "http://localhost:3000/images/default_profile_pic.png",
      };
  if (
    !validator.isEmail(userObject.email) ||
    !validator.isAlphanumeric(userObject.username, ["fr-FR"])
  ) {
  } else {
    if (!schema.validate(userObject.password)) {
      return res.status(401).json({ error: "Mot de passe non sécurisé!!!" });
    }
    bcrypt
      .hash(userObject.password, 10)
      .then((hash) => {
        const user = models.users.create({
          email: xss(userObject.email),
          username: xss(userObject.username),
          role: "user",
          avatar: userObject.avatar,
          password: hash,
        });
        console.log(user);
      })
      .catch((error) => res.status(401).json({ error }));
  }
};

exports.login = (req, res) => {
  const logUser = models.users
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      if (!user) {
        console.log("Utilisateur introuvable!!!");
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log("Mot de passe incorrect !!!");
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOne = (req, res) => {
  const viewUser = models.users
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).send(new Error("User not found!"));
      }
      user.password = null;
      res.status(200).json(user);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteUser = (req, res) => {
  const viewUser = models.users
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.avatar.split("/images/")[1];
      if (!filename.includes("default_profile_pic.png")) {
        fs.unlink(`images/${filename}`, () => {
          models.users
            .destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "Utilisateur supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        models.users.destroy({ where: { id: req.params.id } }).then(() =>
          res
            .status(200)
            .json({ message: "Utilisateur supprimé !" })
            .catch((error) => res.status(400).json({ error }))
        );
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateUser = (req, res) => {
  let userAvatar = {};
  if (req.file) {
    models.users
      .findOne({ where: { id: req.params.id } })
      .then((user) => {
        const filename = user.avatar.split("/images/")[1];
        if (!filename.includes("default_profile_pic.png")) {
          fs.unlinkSync(`images/${filename}`);
        }
        userAvatar = {
          avatar: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
      })
      .then(() => {
        models.users.update(
          { avatar: userAvatar.avatar },
          { where: { id: req.params.id } }
        );
      })
      .then(() => {
        res.status(200).json({ message: "Utilisateur modifié !" });
      });
  } else {
    res.status(401).json({ message: "req.file not found !" });
  }
};
