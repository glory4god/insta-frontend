import Follow from 'lib/mongoDB/models/Follow';
import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  const { collection } = req.query;
  const { username: username } = req.query;

  if (req.method === 'GET') {
    const data = await db
      .collection(collection)
      .find({ username: username })
      .toArray();
    res.json(data);
  }
}
