import { MongoClient } from 'mongodb';

const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.MONGO_PASSWORD
const HOSTNAME = process.env.MONGO_HOSTNAME

const URI =
  `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME ?? 'localhost'}:3001`;

export const getMongoDBClient = async () => {
  const client = new MongoClient(URI);

  await client.connect();
  const receiptdb = client.db("receipt");

  return receiptdb.collection('receipt');
}
