const { User, Thought } = require("../models");

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Get a single thought by thoughtId
const getSingleThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    const thought = await Thought.findById(thoughtId).populate("reactions");

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Create a new thought and add it to a user's thoughts array
const createThought = async (req, res) => {
  const { thoughtText, username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const thought = await Thought.create({ thoughtText, username });
    user.thoughts.push(thought);
    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Update a thought by thoughtId
const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.thoughtText = thoughtText;
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Delete a thought by thoughtId
const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    const thought = await Thought.findByIdAndDelete(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Remove the thought from all users' thoughts array
    const users = await User.updateMany(
      {},
      { $pull: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
};
