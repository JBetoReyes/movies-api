const { Router } = require('express');
const { MoviesService } = require('../services/movies.js'); 

const routerProvider = (app) => {
  const service = new MoviesService();
  const router = new Router();

  router.get('/', async (req, res, next) => {
    try {
      const { tags } = req.query; 
      const response = await service.getMovies({tags});
      res.status(200).json({
        data: response,
        message: 'movies listed'
      });
    } catch(err) {
      next(err);
    }
  });

  router.post('/' ,async (req, res, next) => {
    try {
      const {body} = req;
      const movie = body.data;
      const movieId= await service.createMovie(movie); 
      res.status(201).json({
        data: {
          id: movieId,
          ...movie
        },
        message: 'movies persisted'
      });
    } catch(err) {
      console.log(err);
      next(err);
    }
  });
  router.get('/:id', async (req, res, next) => {
    try {
      console.log('using latest version');
      const { id } = req.params;
      const response = service.getMovie({id});
      res.status(200).json({
        data: response,
        message: 'movies listed'
      });
    } catch(err) {
      next(err);
    }
  });
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data: movie } = req.body;
      const response = await service.updateMovie(id, movie);
      res.status(200).json({
        data: response,
        message: 'movies listed'
      });
    } catch(err) {
      next(err);
    }
  });
  router.delete('/:id', async (req, res, next) => {
    try {
      console.log('using latest version');
      const response = await service.deleteMovie();
      res.status(200).json({
        data: response,
        message: 'movies listed'
      });
    } catch(err) {
      next(err);
    }
  });
  app.use('/movies', router);
};

module.exports = {
  routerProvider
};
