const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");

router.post("/signup", multer, userCtrl.signup);

router.post("/login", userCtrl.login);

router.get("/:id", auth, userCtrl.getOne);

//router.put("/:id", auth, multer, userCtrl.update);

//router.get("/", auth, userCtrl.readAll);

//router.delete("/:id", auth, multer, userCtrl.delete);

module.exports = router;
