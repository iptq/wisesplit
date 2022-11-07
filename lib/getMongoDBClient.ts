import { Db, MongoClient } from 'mongodb';

const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.MONGO_PASSWORD
const HOSTNAME = process.env.MONGO_HOSTNAME
const DATABASENAME = process.env.MONGO_DATABASE_NAME

const URI =
  `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME ?? 'localhost'}:3001`;


let db: Db | null = null;

export const getMongoDBClient = async () => {
  if (db) {
    return db;
  }
  const client = new MongoClient(URI);

  await client.connect();
  db = client.db(DATABASENAME);
  
  return db;
}
