const boom = require('@hapi/boom');

const validate = (data, schema) => {
  const { error } = schema.validate(data);
  return error;
};

const validateHandler = (schema, check = 'body') => { 
  return (req, res, next) => {
    const dataToValidate = req[check];
    const error = validate(dataToValidate, schema);
    error ? next(boom.badRequest(error)) : next();
  }
};

module.exports = {
  validateHandler
};
