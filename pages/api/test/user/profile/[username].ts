import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';
import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();
  await dbConnect();

  const { username } = req.query;

  if (req.method === 'GET') {
    Profile.aggregate(
      [
        {
          $match: { username: username },
        },
        {
          $lookup: {
            from: 'follows',
            localField: 'username',
            foreignField: 'follow',
            as: 'follows',
          },
        },
        {
          $lookup: {
            from: 'follows',
            localField: 'username',
            foreignField: 'follower',
            as: 'followers',
          },
        },
        {
          $lookup: {
            from: 'boards',
            localField: 'username',
            foreignField: 'username',
            as: 'boards',
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            name: 1,
            webSite: 1,
            phone: 1,
            introduce: 1,
            imageUrl: 1,
            gender: 1,
            email: 1,
            followingCnt: { $size: '$follows' },
            followerCnt: { $size: '$followers' },
            boardCnt: { $size: '$boards' },
          },
        },
      ],
      (err: any, profile: any) => {
        if (!profile) {
          return res.status(400).json({ status: 400, message: `get failed` });
        } else {
          return res.status(200).json(profile[0]);
        }
      },
    );
  } else if (req.method === 'PATCH') {
    //TODO: 자기정보 수정 api 짜기
    const userInfo = req.body;

    const success = await db
      .collection('profiles')
      .updateOne({ username: username }, { $set: userInfo })
      .then((res: any) => {
        return res.matchedCount === 1 ? true : false;
      });

    if (success) {
      return res.status(201).json({ status: 201, result: success });
    } else {
      return res.status(400).json({ status: 400, result: success });
    }
  } else {
    return res.status(405).json({
      status: 405,
      message: `possible only GET/PATCH method, input 'method' : ${req.method}`,
    });
  }
}
