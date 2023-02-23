const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const commentController = require("../controllers/comments.controller.js");
const CommentController =new commentController();

router.get("/posts/:postId/comments", CommentController.getComments);
router.post("/posts/:postId/comments", CommentController.addComment);
router.put("/posts/:postId/comments/:commentId", CommentController.updateComment);
router.delete("/posts/:postId/comments/:commentId", CommentController.deleteComment);

module.exports = router;
