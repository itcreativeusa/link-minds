const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController");
const {
  addReaction,
  removeReaction,
} = require("../../controllers/reactionController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
