import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const { userId } = req.query;
    const follower = req.query.follower;
    if (follower) {
    } else {
      var userInfo = await db.collection('user').findOne({ id: userId });

      return res.status(200).json(userInfo);
    }
  } else {
    return res.json({ status: 'possible only GET method' });
  }
}
