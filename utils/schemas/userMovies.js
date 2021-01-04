const joi = require("@hapi/joi");
const { movieIdSchema } = require("./movies.js");
const { userIdSchema } = require("./users.js");

const UserMoviesIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const CreateUserMoviesSchema = joi.object({
  data: joi.object({
    userMovie: joi.object({
      userId: userIdSchema,
      movieId: movieIdSchema,
    }),
  }),
});

module.exports = {
  UserMoviesIdSchema,
  CreateUserMoviesSchema,
};
