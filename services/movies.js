const MongoLib = require('../lib/mongo.js'); 

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongo = new MongoLib(); 
    this.mongo.connect();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = this.mongo.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie(id) {
    const movie = this.mongo.get(this.collection, id);
    return movie || {};
  }

  async createMovie(data) {
    const movie = this.mongo.create(this.collection, data);
    return movie;
  }
  
  async updateMovie(id, data) {
    const updatedMovieId = this.mongo.update(this.collection, id, data);
    return updatedMovieId;
  }

  async deleteMovie(id) {
    const deletedMovieId = this.mongo.delete(this.collection, id);
    return deletedMovieId;
  } 
}

module.exports = {
  MoviesService
}
