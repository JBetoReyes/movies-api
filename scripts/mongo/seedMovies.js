// DEBUG=app:* node scripts/mongo/seedMovies.js

const chalk = require("chalk");
const debug = require("debug")("app:scripts:movies");
const MongoLib = require("../../lib/mongo.js");
const { movies: moviesMock } = require("../../utils/mocks/movies.js");

async function seedMovies() {
  try {
    const mongoDb = new MongoLib();

    const promises = moviesMock.map(async (movie) => {
      await mongoDb.create("movies", movie);
    });

    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} movies have been created successfully`)
    );
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedMovies();
