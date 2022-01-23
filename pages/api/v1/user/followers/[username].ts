import { dbConnect } from 'lib/mongoDB/dbConnect';
import Follow from 'lib/mongoDB/models/Follow';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { username } = req.query;
  if (req.method === 'GET') {
    Follow.aggregate(
      [
        { $match: { follower: username } },
        {
          $lookup: {
            from: 'profiles',
            localField: 'follow',
            foreignField: 'username',
            as: 'profile',
          },
        },
        { $unwind: '$profile' },
        {
          $project: {
            _id: 1,
            username: '$follow',
            name: '$profile.name',
            imageUrl: '$profile.imageUrl',
          },
        },
      ],
      (err: any, follower: any) => {
        if (!follower) {
          return res.status(400).json({ status: 400, message: 'get faileds' });
        } else {
          return res.status(200).json(follower);
        }
      },
    );
  }
}
