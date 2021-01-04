const { routerProvider: moviesRouterProvider } = require("./movies.js");
const { routerProvider: userMoviesRouterProvider } = require("./userMovies.js");
const { routerProvider: authRouterProvider } = require("./auth.js");

const routersProviders = [moviesRouterProvider, userMoviesRouterProvider, authRouterProvider];

const mainRouterProvider = (app) => {
  routersProviders.forEach((provider) => {
    provider(app);
  });
};

module.exports = {
  mainRouterProvider,
};
