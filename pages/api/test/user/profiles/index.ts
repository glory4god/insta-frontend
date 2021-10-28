import Profile from 'lib/mongoDB/models/Profile';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  await dbConnect();

  if (req.method === 'GET') {
    Profile.find(
      {},
      { _id: 0, username: 1, name: 1, imageUrl: 1 },
      (err: any, profile: any) => {
        if (!profile) {
          return res
            .status(400)
            .json({ status: 400, message: `don't exist profiles` });
        } else {
          return res.status(200).json(profile);
        }
      },
    );
  } else {
    return res.status(405).json({
      status: 405,
      message: `possible only GET/PATCH method, input 'method' : ${req.method}`,
    });
  }
}
