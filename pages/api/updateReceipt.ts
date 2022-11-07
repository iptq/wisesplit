import type { NextApiRequest, NextApiResponse } from 'next'
import { getMongoDBClient } from '../../lib/getMongoDBClient';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>[] | Record<string, string>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Only POST method allowed'});
  }
  const receipt = req.body;
  const client = await getMongoDBClient();

  try {
    // TODO implement this
    res.status(200).json(receipt);
  } catch (e) {
    res.status(500).json({message: (e as Error).message});
  }
}
