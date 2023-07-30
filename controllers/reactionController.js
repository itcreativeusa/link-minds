const { Thought } = require("../models");

// Add a reaction to a thought
const addReaction = async (req, res) => {
  console.log("Add a reaction");
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();
    //Reaction added successfully
    res.json({ message: "Reaction added successfully!", thought });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  console.log("Remove a reaction");
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

    // Reaction removed successfully
    res.json({ message: "Reaction removed successfully!", thought });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addReaction,
  removeReaction,
};
