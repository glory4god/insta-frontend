import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  const { username } = req.query;

  if (req.method === 'GET') {
    const profiles = await db
      .collection('profiles')
      .findOne({ username: username });

    if (!profiles) {
      return res.status(400).json({
        status: '400',
        message: `maybe this username(path) doesn't exist! /  input 'username' : ${username}`,
      });
    }

    const boardCnts = await db
      .collection('boards')
      .find({ username: username })
      .count();

    const followerCnts = await db
      .collection('follows')
      .find({ follow: username })
      .count();

    const followingCnts = await db
      .collection('follows')
      .find({ follower: username })
      .count();

    return res.status(200).json({
      ...profiles,
      followerCnt: followerCnts,
      followingCnt: followingCnts,
      boardCnt: boardCnts,
    });
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
