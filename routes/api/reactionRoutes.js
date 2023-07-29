const router = require("express").Router();
const {
  addReaction,
  removeReaction,
} = require("../../controllers/reactionController");

// /api/reactions/:thoughtId
router.route("/:thoughtId").post(addReaction);

// /api/reactions/:thoughtId/:reactionId
router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
