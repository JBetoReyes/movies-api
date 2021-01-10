const MongoLib = require("../lib/mongo.js");

class UserMoviesService {
  constructor() {
    this.collection = "user-movies";
    this.mongoDb = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const movies = await this.mongoDb.getAll(this.collection, query);
    return movies || [];
  }

  async createUserMovies({ userMovie }) {
    const userMovieId = await this.mongoDb.create(this.collection, userMovie);
    return userMovieId;
  }

  async deleteUserMovies({ userMovieId }) {
    const deletedUserMovieId = await this.mongoDb.delete(
      this.collection,
      userMovieId
    );
    return deletedUserMovieId;
  }
}

module.exports = { UserMoviesService };
