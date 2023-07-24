// userRoutes.js
const router = require("express").Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../../controllers/userController");

// Import thoughtRoutes
const thoughtRoutes = require("./thoughtRoutes");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Include the thought routes
router.use("/:userId", thoughtRoutes);

module.exports = router;
