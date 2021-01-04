// DEBUG=app:* node scripts/mongo/seedUsers

const bcrypt = require("bcrypt");
const chalk = require("chalk");
const debug = require("debug")("app:scripts:users");
const MongoLib = require("../../lib/mongo.js");
const { config } = require("../../config");

const users = [
  {
    email: "root@email.com",
    name: "ROOT",
    password: config.defaultAdminPassword,
    isAdmin: true,
  },
  {
    email: "jose@email.com",
    name: "Jose Reyes",
    password: config.defaultPublicPassword,
  },
  {
    email: "maria@email.com",
    name: "Maria Reyes",
    password: config.defaultPublicPassword,
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  console.log("users: ", users);
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create("users", {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();
    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green("User Created with id:", userId));
    });
    await Promise.all(promises);
    return process.exit(0);
  } catch (err) {
    console.log(err);
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedUsers();
