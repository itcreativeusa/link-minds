const { User, Thought, Reaction } = require("../models");

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
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
    const thought = await Thought.findById(thoughtId);

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
  const { userId } = req.params;
  const { thoughtText, username } = req.body;

  try {
    const user = await User.findById(userId);

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

    // Remove the thought from the user's thoughts array
    const user = await User.findById(thought.userId);
    if (user) {
      user.thoughts.pull(thought._id);
      await user.save();
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    const reaction = thought.reactions.find(
      (reaction) => reaction._id.toString() === reactionId
    );

    if (!reaction) {
      return res.status(404).json({ message: "Reaction not found" });
    }

    thought.reactions.pull(reaction._id);
    await thought.save();

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
  addReaction,
  removeReaction,
};
