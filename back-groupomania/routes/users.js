const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");

router.post("/signup", multer, userCtrl.signup);

router.post("/login", userCtrl.login);

router.get("/:id", auth, userCtrl.getOne);

router.put("/:id", auth, multer, userCtrl.updateUser);

//router.get("/", auth, userCtrl.getAll);

router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
