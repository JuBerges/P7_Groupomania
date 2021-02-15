const bcrypt = require("bcryptjs");
const fs = require("fs");
const validator = require("validator");
const passwordValidator = require("password-validator");
const db = require("../models");
const xss = require("xss");
const jwt = require("jsonwebtoken");

const schema = new passwordValidator();
schema
  .is()
  .min(8) // Longueur minimum 8
  .is()
  .max(100) // Longueur maximum 100
  .has()
  .uppercase() // Doit contenir une majuscule
  .has()
  .lowercase() // Doit contenir une minuscule
  .has()
  .digits(1) // Doit contenir au moins 2 chiffres
  .has()
  .not()
  .spaces() // Doit contenir aucun espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Mot de passes blacklistés

//====> Créer un nouvel utilisateur <====\\
exports.signup = (req, res) => {
  let userRole;
  db.users
    .findAll()
    .then((users) => {
      /* Le premier utilisateur créé sera l'administrateur,
       le fichier de bdd contient déja le compte d'utilisateur supprimé */
      if (users.length === 1) {
        return (userRole = "admin");
      } else {
        return (userRole = "user");
      }
    })
    .then((role) => {
      console.log(role);
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
          return res
            .status(401)
            .json({ error: "Mot de passe non sécurisé!!!" });
        }
        bcrypt
          .hash(userObject.password, 10)
          .then((hash) => {
            const user = db.users.create({
              email: xss(userObject.email),
              username: xss(userObject.username),
              role: role,
              avatar: userObject.avatar,
              password: hash,
            });
            console.log(user);
          })
          .catch((error) => res.status(401).json({ error }));
      }
    });
};
//====> Connexion d'un utilisateur <====\\
exports.login = (req, res) => {
  const logUser = db.users
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
//====> Récupère l'utilisateur connecté <====\\
exports.getOne = (req, res) => {
  const viewUser = db.users
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
//====> Récupèration les l'utilisateurs <====\\
exports.getAll = (req, res) => {
  const viewUsers = db.users
    .findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).send(new Error("User not found!"));
      }
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ error }));
};
//====> Supprime l'utilisateur connecté <====\\
exports.deleteUser = (req, res) => {
  function reAsign() {
    return new Promise((resolve) => {
      console.log("dedans");
      db.likes
        .update({ user_id: 3 }, { where: { user_id: req.params.id } })
        .then(() => {
          db.comments
            .update({ user_id: 3 }, { where: { user_id: req.params.id } })
            .then(() => {
              db.posts
                .update({ user_id: 3 }, { where: { user_id: req.params.id } })
                .then(() => resolve())
                .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(500).json(error));
        })
        .catch((error) => res.status(500).json(error));
    });
  }
  reAsign()
    .then(() => {
      db.users.findOne({ where: { id: req.params.id } }).then((user) => {
        const filename = user.avatar.split("/images/")[1];
        if (!filename.includes("default_profile_pic.png")) {
          fs.unlink(`images/${filename}`, () => {
            db.users
              .destroy({ where: { id: req.params.id } })
              .then(() =>
                res.status(200).json({ message: "Utilisateur supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          db.users.destroy({ where: { id: req.params.id } }).then(() =>
            res
              .status(200)
              .json({ message: "Utilisateur supprimé !" })
              .catch((error) => res.status(400).json({ error }))
          );
        }
      });
    })
    .catch((error) => res.status(500).json(error));
};
//====> Met à jour l'avatar de l'utilisateur <====\\
exports.updateUser = (req, res) => {
  let userAvatar = {};
  if (req.file) {
    db.users
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
        db.users.update(
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
