const router = require("express").Router();
const {
  getFriends,
  getSingleFriend,
  createFriend,
  updateFriend,
  deleteFriend,
} = require("../../controllers/friendController");

// /api/friends
router.route("/").get(getFriends).post(createFriend);

// /api/friends/:friendId
router
  .route("/:friendId")
  .get(getSingleFriend)
  .put(updateFriend)
  .delete(deleteFriend);

module.exports = router;
