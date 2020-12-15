const express = require('express');
const bodyParser = require('body-parser');
const { mainRouterProvider } = require('./routers');
const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandler.js');
const { notFoundHandler } = require('./utils/middleware/notFoundHandler.js');

const app = express();

const { config } = require('./config/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mainRouterProvider(app);

// Not found handler
app.use(notFoundHandler);

// Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`The App listen on port: ${config.port}`);
});
