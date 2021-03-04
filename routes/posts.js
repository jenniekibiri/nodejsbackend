const express = require("express");

const router = express.Router();
const {
  getAllPosts,
  deletePosts,
  updatePost,
  postedByUser,
  createPosts,
  isPoster,
  postById,
  getPost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { postValidator } = require("../validator");
const { userById } = require("../controllers/users");

router.param("UserId", userById);
router.param("postId", postById);

router.post("/posts/new/:UserId", requireSignin, createPosts, postValidator);
router.get("/posts", getAllPosts);
router.delete("/deletepost/:postId", requireSignin, isPoster, deletePosts);
router.put("/updatepost/:postId", requireSignin, isPoster, updatePost);
router.get("/posts/by/:UserId", postedByUser);
router.get("/post/:postId",getPost)
module.exports = router;
