import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = process.env.ATLAS_URL;

let _db;

export const initDB = callback => {
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then(client => {
      console.log("Database connected!");
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

export const getDB = () => {
  if (!_db) {
    throw Error("Database not initialzed");
  }
  return _db;
};
