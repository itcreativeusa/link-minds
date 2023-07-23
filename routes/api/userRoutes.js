const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
router.route("/:userId/thoughts").post(addThought);

// /api/users/:userId/thoughts/:thoughtId
router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
