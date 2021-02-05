const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/posts");

router.post("/", multer, postCtrl.createPost);

router.get("/", auth, postCtrl.getAll);

router.delete("/:id", auth, postCtrl.deletePost);

router.post("/:postId/:userId/like", auth, postCtrl.createLike);

router.get("/:id/like", auth, postCtrl.getLike);

router.post("/comment", auth, postCtrl.createComment);

router.delete("/:id/comment", auth, postCtrl.deleteComment);

router.get("/:postId/comments", auth, postCtrl.getComments);

module.exports = router;
