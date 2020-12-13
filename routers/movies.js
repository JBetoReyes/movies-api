const { Router } = require('express');
const { movies } = require('../utils/mocks/movies.js');

const routerProvider = (app) => {
  const router = new Router();

  router.get('/', async (req, res, next) => {
    try {
      console.log('using latest version');
      const response = await Promise.resolve(movies);
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
      const response = await Promise.resolve([
        ...movies,
        movie
      ]);
      res.status(201).json({
        data: response,
        message: 'movies persisted'
      });
    } catch(err) {
      console.log(err);
      next(err);
    }
  });
  app.use('/movies', router);
};

module.exports = {
  routerProvider
};
