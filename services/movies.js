const { movies: moviesMock } = require('../utils/mocks/movies.js');
const MongoLib = require('../lib/mongo.js'); 

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.connection = new MongoLib(); 
    this.connection.connect();
  }

  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie(id) {
    const movie = await Promise.resolve(moviesMock[id]);
    return movie || {};
  }

  async createMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie;
  }
  
  async updateMovie() {
    const id = await Promise.resolve(1);
    return id;
  }

  async deleteMovie() {
    const id = await Promise.resolve(1);
    return id;
  }
}

module.exports = {
  MoviesService
}
