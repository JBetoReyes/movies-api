const MongoLib = require("../lib/mongo.js");

class UserMoviesService {
  constructor() {
    this.collection = "user-movies";
    this.mongoDb = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const movies = await this.mongoDb(this.collection, query);
    return movies || [];
  }

  async createUserMovies({ userMovie }) {
    const userMovieId = await this.mongoDb(this.collection, userMovie);
    return userMovieId;
  }

  async deleteUserMovies({ userMovieId }) {
    const deletedUserMovieId = await this.mongDb(this.collection, userMovieId);
    return deletedUserMovieId;
  }
}

module.exports = { UserMoviesService };
