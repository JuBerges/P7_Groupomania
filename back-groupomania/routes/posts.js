const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/posts");

router.post("/post", multer, postCtrl.createPost);

router.get("/:id", auth, postCtrl.getOne);

router.put("/:id", auth, multer, postCtrl.updatePost);

router.get("/", auth, postCtrl.getAll);

router.delete("/:id", auth, postCtrl.deletePost);

router.post("/:id/like", postCtrl.createLike);

router.get("/:id/like", postCtrl.getLike);

module.exports = router;
