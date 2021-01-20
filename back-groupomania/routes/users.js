const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/users");

router.post("/signup", multer, userCtrl.signup);

router.post("/login", userCtrl.login);

//router.get("/:id", userCtrl.readOne);

//router.put("/:id", multer, userCtrl.update);

//router.get("/", userCtrl.readAll);

//router.delete("/:id", multer, userCtrl.delete);

module.exports = router;
