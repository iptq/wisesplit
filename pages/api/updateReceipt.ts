import type { NextApiRequest, NextApiResponse } from 'next'
import { getMongoDBClient } from '../../lib/getMongoDBClient';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>[] | Record<string, string>>
) {
  const receipt = req.body;
  const client = await getMongoDBClient();

  console.log('called', receipt);

  try {
    // TODO implement this
    res.status(200).json(receipt);
  } catch (e) {
    res.status(500).json({message: (e as Error).message});
  }
}
