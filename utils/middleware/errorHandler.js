const boom = require('@hapi/boom');
const { config } = require('../../config');

const withErrorStack = (err, stack) => {
  if (config) {
    return {
      ...err,
      stack  
    };
  } 
  return err;
}

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
}

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
    return;
  }
  next(err);
}

const errorHandler = (err, req, res, next) => { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  errorHandler,
  wrapErrors,
  logErrors
};
