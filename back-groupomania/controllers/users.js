const bcrypt = require("bcryptjs");
const fs = require("fs");
const validator = require("validator");
const passwordValidator = require("password-validator");
const models = require("../models");
const jwt = require("../middleware/jwt");

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
  if (
    !validator.isEmail(req.body.email) ||
    !validator.isAlphanumeric(req.body.username[("fr-FR", "en-US", locale)])
  ) {
    return res.status(422).json({
      message:
        "Mauvais format - Utilisez seulement des chiffres et des lettres svp",
    });
  } else {
    if (schema.validate(req.body.password)) {
      let role;
      models.users.findAll().then((users) => {
        if (users.length === 0) {
          bcrypt.hash(req.body.password, 10);
          role = json.stringify(["admin", "user"]).then((hash) => {
            let urlProfilePic;
            if (req.file) {
              urlProfilePic = req.file.filename;
            } else {
              urlProfilePic = `defaultProfielPic.png`;
            }
            models.users
              .create({
                email: xss(req.body.email),
                password: hash,
                username: xss(req.body.username),
                url_profile_pic: urlProfilePic,
                role: role,
              })

              .catch((err) => {
                res.status(500).json(err);
              });
          });
        } else {
          role = JSON.stringify(["user"]);
          models.users
            .findOne({
              attributes: ["email"],
              where: { email: req.body.email },
            })
            .then((user) => {
              if (!user) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                  let urlProfilePic;
                  if (req.file) {
                    urlProfilePic = req.file.filename;
                  } else {
                    urlProfilePic = `defaultProfilePic.png`;
                  }
                  models.users
                    .create({
                      email: xss(req.body.email),
                      password: hash,
                      username: xss(req.body.username),
                      url_profile_pic: urlProfilePic,
                      role: role,
                    })
                    .then((newUser) => {
                      res.status(201).json({
                        message: `New user created ! User ID: ${newUser.id}`,
                      });
                    })
                    .catch((err) => {
                      res.status(500).json(err);
                    });
                });
              } else {
                return res
                  .status(401)
                  .json({ message: "This email address is already used !" });
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      });
    } else {
      res.status(400).json({
        message:
          "Your password must contain at least 8 characters with minimun one uppercase letter and one digits ",
      });
    }
  }
};

exports.login = (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(422).json({ message: "Invalid email !" });
  } else {
    models.users.findOne({ where: { email: req.body.email } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "This user can't be found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Wrong password !" });
          } else {
            res.status(200).json({
              user_id: user.id,
              token: jwt.tokenGeneration(user),
            });
          }
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
  }
};
