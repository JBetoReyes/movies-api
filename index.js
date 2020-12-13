const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { config } = require('./config/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  res.send('Hello world');
});

app.get('/json', (req, res) => {
  res.json({
    hello: 'world'
  });
});

app.listen(config.port, () => {
  console.log(`App listen on port: ${config.port}`);
});
