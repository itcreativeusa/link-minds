const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");
const friendsRoutes = require("./friendsRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);
router.use("/friends", friendsRoutes);

module.exports = router;
