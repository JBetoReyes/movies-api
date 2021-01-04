const { Router } = require("express");
const joi = require("@hapi/joi");
const { validateHandler } = require("../utils/middleware/validationHandler.js");
const { UserMoviesService } = require("../services/userMovies.js");
const {
  UserMoviesIdSchema,
  CreateUserMoviesSchema,
} = require("../utils/schemas/userMovies");
const { userIdSchema } = require("../utils/schemas/users");

const routerProvider = (app) => {
  const service = new UserMoviesService();
  const router = Router();
  app.use("/user-movies", router);
  router.get(
    "/",
    validateHandler(joi.object({ userId: userIdSchema }), "query"),
    async (req, res, next) => {
      try {
        const { userId } = req.query;
        const userMovies = await service.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          message: "movies listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post(
    "/",
    validateHandler(CreateUserMoviesSchema),
    async (req, res, next) => {
      const { userMovie } = req.body.data;
      try {
        const userMovieId = await service.createUserMovies({ userMovie });
        res.status(201).json({
          data: {
            userMovieId,
          },
          message: "user movie created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:userMovieId",
    validateHandler(joi.object({ userMovieId: UserMoviesIdSchema }), "params"),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const deletedUserMovieId = await service.deleteUserMovies({
          userMovieId,
        });
        res.status(200).json({
          data: {
            userMovieId: deletedUserMovieId,
          },
          message: "user movies deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = { routerProvider };
