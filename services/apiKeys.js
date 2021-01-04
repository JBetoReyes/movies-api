const MongoLib = require("../lib/mongo.js");

class ApiKeysService {
  constructor() {
    this.collection = "api-keys";
    this.mongoDb = new MongoLib();
  }

  async getKey({ token }) {
    const [apiKey] = await this.mongoDb.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeysService;
