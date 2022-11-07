import { Db, MongoClient } from 'mongodb';

const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.MONGO_PASSWORD
const HOSTNAME = process.env.MONGO_HOSTNAME
const DATABASE_NAME = process.env.MONGO_DATABASE_NAME
const DATABASE_PORT = process.env.MONGO_DATABASE_PORT

const URI =
  `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME ?? 'localhost'}:${DATABASE_PORT}`;


let db: Db | null = null;

export const getMongoDBClient = async () => {
  if (db) {
    return db;
  }
  const client = new MongoClient(URI);

  await client.connect();
  db = client.db(DATABASE_NAME);
  
  return db;
}
