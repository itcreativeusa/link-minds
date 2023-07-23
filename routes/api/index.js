const router = require("express").Router();
const courseRoutes = require("./courseRoutes");
const userRoutes = require("./userRoutes");
const thoughtsRoutes = require("./thoughtsRoutes");
const reactionRoutes = require("./reactionRoutes");

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);
router.use("/reaction", reactionRoutes);
module.exports = router;
