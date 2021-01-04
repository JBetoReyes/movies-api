require("dotenv").config();
const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  authJWTSecret: process.env.AUTH_JWT_SECRET,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultPublicPassword: process.env.DEFAULT_USER_PASSWORD,
  publicApiKey: process.env.PUBLIC_API_KEY,
  adminApiKey: process.env.ADMIN_API_KEY,
};

module.exports = { config };
