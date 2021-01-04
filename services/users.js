const bcrypt = require("bcrypt");
const MongoLib = require("../lib/mongo.js");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDb = new MongoLib();
  }

  async getUser({ email }) {
    const query = email && { email };
    const [user] = await this.mongoDb.getAll(this.collection, query);
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await this.mongoDb.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    return userId;
  }
}

module.exports = UsersService;
