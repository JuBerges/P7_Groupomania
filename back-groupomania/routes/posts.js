const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/posts");

//====> Création publication <====\\
router.post("/", auth, multer, postCtrl.createPost);

//====> Misa à jour publication <====\\
router.put("/update", auth, multer, postCtrl.updatePost);

//====> Récupèration des publications <====\\
router.get("/", auth, postCtrl.getAll);

//====> Suppression d'une publication <====\\
router.delete("/:id", auth, postCtrl.deletePost);

//====> Ajout ou suppresson de like <====\\
router.post("/:postId/:userId/like", auth, postCtrl.createLike);

//====> Récupèration des likes d'une publication <====\\
router.get("/:id/like", auth, postCtrl.getLike);

//====> Création commentaire <====\\
router.post("/comment", auth, postCtrl.createComment);

//====> Suppression d'un commentaire <====\\
router.delete("/:id/comment", auth, postCtrl.deleteComment);

//====> Récupèration des commentaires d'une publication <====\\
router.get("/:postId/comments", auth, postCtrl.getComments);

module.exports = router;
