const { MongoClient, ObjectId  } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${config.dbHost}:27017/${DB_NAME}`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  async connect() {
    console.log(MONGO_URI);
    if (!MongoLib.connection) {
      MongoLib.connection = await new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            return reject(err);
          }
          console.log('Connected successfully to mongo.');
          resolve(this.client.db(this.dbName));
        });
      })
    }
    return MongoLib.connection;
  }
}

module.exports = MongoLib;
