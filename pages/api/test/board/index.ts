import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();
  const userId = req.query.userId;

  if (userId) {
    const board = await db.collection('board').find({ id: userId }).toArray();
    return res.status(200).json(board);
  } else {
    const board = await db.collection('board').find({}).toArray();
    return res.status(200).json(board);
  }
}
