const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:27017/${DB_NAME}?authSource=admin`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      reconnectTries: 30,
      reconnectInterval: 1000,
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = await new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            return reject(err);
          }
          console.log("Connected successfully to mongo.");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({
      _id: ObjectId(id),
    });
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db.collection(collection).updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: data,
      },
      {
        upsert: true,
      }
    );
    return result.upsertId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({
      _id: ObjectId(id),
    });
    return id;
  }
}

module.exports = MongoLib;
