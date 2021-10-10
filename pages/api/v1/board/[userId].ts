import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();
  const { userId } = req.query;

  const userInfo = await db.collection('board').find({ id: userId }).toArray();

  return res.json(userInfo);
}
