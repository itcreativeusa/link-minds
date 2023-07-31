const connection = require("../config/connection");
const { Thought, User, Reaction } = require("../models");
const { getRandomName } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  try {
    // Drop existing thoughts and users
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Create empty array to hold the users and thoughts
    const users = [];
    const thoughts = [];

    // Loop 10 times -- add users to the users array
    for (let i = 0; i < 10; i++) {
      const fullName = getRandomName();
      const first = fullName.split(" ")[0];
      const last = fullName.split(" ")[1];
      const username = `${first}${Math.floor(
        Math.random() * (99 - 18 + 1) + 18
      )}`;
      const linkedin = `https://www.linkedin.com/in/${first}${Math.floor(
        Math.random() * (99 - 18 + 1) + 18
      )}`;

      // Create thoughts for each user: random number between 1 and 3
      const numThoughts = Math.floor(Math.random() * 4);
      userThoughtIds = [];
      for (let j = 0; j < numThoughts; j++) {
        const thought = await Thought.create({
          thoughtText: `Life is beautiful ${i * 4 + j + 1}`,
          username: username,
        });
        userThoughtIds.push(thought._id);
        thoughts.push(thought);
      }

      const user = await User.create({
        first,
        last,
        username: username,
        email: `${username}@gmail.com`,
        thoughts: userThoughtIds,
        linkedin,
      });

      users.push(user);
    }

    // Add reactions to some of the thoughts
    for (let i = 0; i < thoughts.length; i++) {
      for (let j = 0; j < 5; j++) {
        const user = users[Math.floor(Math.random() * users.length)];

        // update Thought with reactions
        await Thought.findByIdAndUpdate(thoughts[i]._id, {
          $push: {
            reactions: {
              reactionBody: `Great words, i agree! ${j + 1}`,
              username: user.username,
            },
          },
        });
      }
    }

    console.info("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
