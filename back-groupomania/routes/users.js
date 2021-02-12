const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");

//====> Création utilisateur <====\\
router.post("/signup", multer, userCtrl.signup);

//====> Connexion utilisateur <====\\
router.post("/login", userCtrl.login);

//====> Récupèration de l'utilisateur connecté <====\\
router.get("/:id", auth, userCtrl.getOne);

//====> Récupèration les l'utilisateurs <====\\
router.get("/", auth, userCtrl.getAll);

//====> Mise à jour de l'avatar utilisateur connecté <====\\
router.put("/:id", auth, multer, userCtrl.updateUser);

//====> Suprression de l'utilisateur connecté <====\\
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
