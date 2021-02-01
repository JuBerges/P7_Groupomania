const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");

router.post("/comment", multer, commentCtrl.comment);

router.get("/:id", auth, commentCtrl.getOne);

router.put("/:id", auth, multer, commentCtrl.updateComment);

router.get("/", auth, commentCtrl.getAll);

router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
