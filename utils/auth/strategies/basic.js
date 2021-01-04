const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UserService = require("../../../services/users.js");
const userService = new UserService();

passport.use(
  new BasicStrategy(async function basicStrategy(email, password, cb) {
    try {
      const user = await userService.getUser({ email });
      if (!user) {
        cb(boom.unauthorized(), false);
        return;
      }

      const isAuthorized = await bcrypt.compare(password, user.password);

      if (!isAuthorized) {
        cb(boom.unauthorized(), false);
        return;
      }

      delete user.password;
      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);
