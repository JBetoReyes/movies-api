const { routerProvider: moviesRouterProvider } = require('./movies.js');

const routersProviders = [
  moviesRouterProvider
];

const mainRouterProvider = (app) => {
  routersProviders.forEach((provider) => {
    provider(app);
  });
};

module.exports = {
  mainRouterProvider
};
