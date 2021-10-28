import { dbConnect } from 'lib/mongoDB/dbConnect';
import Follow from 'lib/mongoDB/models/Follow';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { username, follower } = req.query;

  if (req.method === 'GET') {
    Follow.aggregate(
      [
        { $match: { follow: username } },
        {
          $lookup: {
            from: 'profiles',
            localField: 'follower',
            foreignField: 'username',
            as: 'profile',
          },
        },
        { $unwind: '$profile' },
        {
          $project: {
            _id: 1,
            username: '$follower',
            name: '$profile.name',
            imageUrl: '$profile.imageUrl',
          },
        },
      ],
      (err: any, follow: any) => {
        console.log(follow);
        if (!follow) {
          return res.status(400).json({ status: 400, message: 'get faileds' });
        } else {
          return res.status(200).json(follow);
        }
      },
    );
  } else if (req.method === 'POST') {
    Follow.findOne(
      { follow: username, follower: follower },
      (err: any, follow: any) => {
        if (follow) {
          return res.status(400).json({
            status: 400,
            message: `You are already following! follow:${username}, follower:${follower}`,
          });
        } else {
          var follow = new Follow({ follow: username, follower: follower });
          follow.createDate = new Date();
          follow.save((err: any) => {
            if (err) {
              return res
                .status(500)
                .json({ status: 400, message: 'save failed' });
            } else {
              return res
                .status(200)
                .json({ status: 200, message: 'save success' });
            }
          });
        }
      },
    );
  } else if (req.method === 'DELETE') {
    Follow.findOneAndDelete(
      { follow: username, follower: follower },
      (err: any, follow: any) => {
        if (!follow) {
          return res
            .status(400)
            .json({ status: 400, message: `You are not already following!` });
        }
        if (err) {
          return res
            .status(500)
            .json({ status: 400, message: 'delete failed' });
        } else {
          return res
            .status(200)
            .json({ status: 200, message: 'delete success' });
        }
      },
    );
  }
}
