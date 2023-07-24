const connection = require("../config/connection");
const { Thought, User, Reaction } = require("../models");
const { getRandomName } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts, users, and reactions
  await Thought.deleteMany({});
  await User.deleteMany({});
  await Reaction.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [];
  const thoughts = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const linkedin = `https://www.linkedin.com/in/${first}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;

    const user = await User.create({
      first,
      last,
      username: github,
      email: `${github}@gmail.com`,
      linkedin,
    });

    users.push(user);

    const thought = await Thought.create({
      thoughtText: `Thought ${i + 1}`,
      username: user.username,
    });

    thoughts.push(thought);
  }

  // Add reactions to some of the thoughts
  for (let i = 0; i < thoughts.length; i++) {
    for (let j = 0; j < 5; j++) {
      const user = users[Math.floor(Math.random() * users.length)];
      await Reaction.create({
        reactionBody: `Reaction ${j + 1}`,
        username: user.username,
        thoughtId: thoughts[i]._id,
      });
    }
  }

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
