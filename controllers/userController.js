const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
const grade = async (userId) =>
  User.aggregate([
    // only include the given user by using $match
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: "$thoughts",
    },
    {
      $group: {
        _id: ObjectId(userId),
        overallGrade: { $avg: "$thoughts.score" },
      },
    },
  ]);

// Get all users
const getUsers = (req, res) => {
  User.find()
    .populate("thoughts")
    .populate("friends")
    .then(async (users) => {
      const userObj = {
        users,
        headCount: await headCount(),
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
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .populate("thoughts")
    .populate("friends")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({
            user,
            grade: await grade(req.params.userId),
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// create a new user
const createUser = async (req, res) => {
  const { username, email } = req.body;

  // Check if username and email are provided in the request body
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  try {
    const user = await User.create({ username, email }); // Pass only the required fields
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Update a user
const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// Delete a user and remove related thoughts
const deleteUser = (req, res) => {
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      } else {
        // Remove the associated thoughts
        return Thought.deleteMany({ userId: user._id }).then(() =>
          res.json({
            message: "User and associated thoughts successfully deleted",
          })
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
  console.log("You are adding an thought");
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
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// Remove thought from a user
const removeThought = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// Add a friend to a user
const addFriend = (req, res) => {
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
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
};

// Remove a friend from a user
const deleteFriend = (req, res) => {
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
      res.json(dbUserData);
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
