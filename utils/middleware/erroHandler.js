const errorHandler = (err, req, res, next) => { // eslint-disable-line
  res.status(500);
  res.json(err);
}

module.exports = {
  errorHandler
};
