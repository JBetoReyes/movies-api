const express = require('express');
const bodyParser = require('body-parser');
const { mainRouterProvider } = require('./routers');
const { errorHandler } = require('./utils/middleware/erroHandler.js');

const app = express();

const { config } = require('./config/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mainRouterProvider(app);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`The App listen on port: ${config.port}`);
});
