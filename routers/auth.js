const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const UserService = require("../services/users.js");
const ApiKeyService = require("../services/apiKeys.js");
const { validateHandler } = require("../utils/middleware/validationHandler.js");
const {
  createUserSchema,
  createProviderUserSchema,
} = require("../utils/schemas/users");

require("../utils/auth/strategies/basic.js");

const userService = new UserService();
const apiKeyService = new ApiKeyService();

const routerProvider = (app) => {
  const router = express.Router();
  app.use("/auth", router);

  router.post("/sign-in", (req, res, next) => {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized(), false);
      return;
    }
    passport.authenticate("basic", (err, user) => {
      try {
        if (err || !user) {
          next(boom.unauthorized());
          return;
        }

        req.login(user, { session: false }, async (err) => {
          if (err) {
            next(err);
            return;
          }
          const apiKey = await apiKeyService.getKey({ token: apiKeyToken });
          if (!apiKey) {
            next(boom.unauthorized());
            return;
          }

          const { _id: id, name, email } = user;

          const payload = {
            id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJWTSecret, {
            expiresIn: "15m",
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });
  validateHandler(),
    router.post(
      "/sign-up",
      validateHandler(createUserSchema),
      async (req, res, next) => {
        const { user } = req.body.data;
        try {
          const userId = await userService.createUser({ user });
          res.status(201).json({
            data: userId,
            message: "user created",
          });
        } catch (err) {
          next(err);
        }
      }
    );

  router.post(
    "/sign-provider",
    validateHandler(createProviderUserSchema),
    async (req, res, next) => {
      const { data } = req.body;
      const { apiKeyToken, ...user } = data;
      if (!apiKeyToken) {
        next(boom.unauthorized());
        return;
      }
      try {
        const queriedUser = await userService.getOrCreate({ user });
        const apiKey = await apiKeyService.getKey({ token: apiKeyToken });
        if (!apiKey) {
          next(boom.unauthorized());
          return;
        }
        const { _id: id, email, name } = queriedUser;
        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes,
        };
        const token = jwt.sign(payload, config.authJWTSecret, {
          expiresIn: "15m",
        });
        return res.status(200).json({
          token,
          ...payload,
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = {
  routerProvider,
};
