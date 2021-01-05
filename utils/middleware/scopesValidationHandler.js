const boom = require("@hapi/boom");

const scopesValidationHandler = (allowedScopes) => {
  return (req, res, next) => {
    if (!req.user || !req.user.scopes) {
      next(boom.unauthorized("Missing Scopes"));
      return;
    }
    const hasAccess = allowedScopes.every((allowScope) => {
      return req.user.scopes.includes(allowScope);
    });

    if (hasAccess) {
      next();
      return;
    } else {
      next(boom.unauthorized("Insufficient scopes"));
      return;
    }
  };
};

module.exports = {
  scopesValidationHandler,
};
