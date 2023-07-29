const { User } = require("../models");

// Get all friends
const getFriends = async (req, res) => {
  try {
    const friends = await User.find();
    res.json(friends);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Get a single friend by friendId
const getSingleFriend = async (req, res) => {
  const { friendId } = req.params;

  try {
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.json(friend);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Create a new friend
const createFriend = async (req, res) => {
  const { name } = req.body;

  try {
    const friend = await User.create({ name });
    res.json(friend);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Update a friend by friendId
const updateFriend = async (req, res) => {
  const { friendId } = req.params;
  const { name } = req.body;

  try {
    const friend = await User.findByIdAndUpdate(
      friendId,
      { name },
      { new: true }
    );
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.json(friend);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Delete a friend by friendId
const deleteFriend = async (req, res) => {
  const { friendId } = req.params;

  try {
    const friend = await User.findByIdAndDelete(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.json(friend);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getFriends,
  getSingleFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};
