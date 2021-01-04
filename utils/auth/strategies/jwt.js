const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const UserService = require("../../../services/users.js");
const { config } = require("../../../config");
const userService = new UserService();
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authJWTSecret,
    },
    async (payload, done) => {
      try {
        const user = await userService.getUser({ email: payload.email });
        if (!user) {
          done(boom.unauthorized(), false);
          return;
        }
        delete user.password;
        done(null, { ...user, scopes: payload.scopes });
      } catch (err) {
        done(err);
      }
    }
  )
);
