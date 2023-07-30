const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Get all users
const getUsers = (req, res) => {
  console.log("Get all users");
  User.find()
    .populate("thoughts")
    .populate("friends")
    .then(async (users) => {
      const userObj = {
        users,
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Get a single user
const getSingleUser = (req, res) => {
  console.log("Get a single user");
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .populate("thoughts")
    .populate("friends")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({
            user,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// create a new user
const createUser = async (req, res) => {
  console.log("Create a new user");
  const { username, email } = req.body;

  // Check if username and email are provided in the request body
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  try {
    const user = await User.create({ username, email }); // Pass only the required fields
    res.json({ message: "User added successfully!" }, user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Update a user
const updateUser = (req, res) => {
  console.log("Update a user");
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json({ message: "User updated successfully!" }, user)
    )
    .catch((err) => res.status(500).json(err));
};

// Delete a user and remove related thoughts
const deleteUser = (req, res) => {
  console.log("Delete a user");
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      } else {
        // Remove the associated thoughts
        return Thought.deleteMany({ userId: user._id }).then(() =>
          res.json(
            {
              message: "User and associated thoughts successfully deleted",
            },
            user
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add an thought to a user
const addThought = (req, res) => {
  console.log("Add a thought");
  console.log(req.body);
  const thoughtData = req.body;

  Thought.create(thoughtData)
    .then((createdThought) => {
      return User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: createdThought._id } },
        { runValidators: true, new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json({ message: "Thought created successfully!" }, user)
    )
    .catch((err) => res.status(500).json(err));
};

// Remove thought from a user
const removeThought = (req, res) => {
  console.log("Remove a thought");
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json({ message: "Thought removed successfully!" }, user)
    )
    .catch((err) => res.status(500).json(err));
};

// Add a friend to a user
const addFriend = (req, res) => {
  console.log("Add a friend");
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true, runValidators: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Friend added successfully
      res.json({ message: "Friend added successfully!" }, dbUserData);
    })
    .catch((err) => res.json(err));
};

// Remove a friend from a user
const deleteFriend = (req, res) => {
  console.log("Delete a friend");
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Friend deleted successfully
      res.json({ message: "Friend deleted successfully!" });
    })
    .catch((err) => res.json(err));
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addThought,
  removeThought,
  addFriend,
  deleteFriend,
};
