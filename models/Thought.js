// Thought model with embedded reactions
const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: [280, "Reaction must be less than 280 characters."],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: [280, "Thought must be less than 280 characters."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
