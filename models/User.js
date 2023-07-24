const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
      match: /.+\@.+\..+/,
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    linkedin: {
      type: String, // Modify this based on your requirements
      trim: true,
    },
    github: {
      type: String, // Modify this based on your requirements
      trim: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
