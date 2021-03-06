// DEBUG=app:* node scripts/mongo/seedApikeys.js

const chalk = require("chalk");
const crypto = require("crypto");
const debug = require("debug")("app:scripts:api-keys");
const MongoLib = require("../../lib/mongo");

const adminScopes = [
  "signin:auth",
  "signup:auth",
  "read:movies",
  "create:movies",
  "update:movies",
  "delete:movies",
  "read:user-movies",
  "create:user-movies",
  "delete:user-movies",
];

const publicScopes = [
  "signin:auth",
  "signup:auth",
  "read:movies",
  "read:user-movies",
  "create:user-movies",
  "delete:user-movies",
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString("hex");
}

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();
    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create("api-keys", apiKey);
    });
    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} api keys have been created successfully`)
    );
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedApiKeys();
