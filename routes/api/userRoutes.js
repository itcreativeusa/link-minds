// userRoutes.js
const router = require("express").Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Import thoughtRoutes
const thoughtRoutes = require("./thoughtRoutes");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Include the thought routes under /api/users/:userId/thoughts
router.use("/:userId/thoughts", thoughtRoutes);
// /api/users/:userId/friends/:friendId add friend
router.route("/:userId/friends/:friendId").post(addFriend);

// /api/friends/:friendId delete friend
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
