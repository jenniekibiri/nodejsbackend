const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();
router.get("/users", allUsers);
router.param("userId", userById);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
module.exports = router;
