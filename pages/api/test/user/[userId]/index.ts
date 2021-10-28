import { connectToDatabase } from 'lib/mongoDB/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  const { userId } = req.query;

  if (req.method === 'GET') {
    var userInfo = await db.collection('user').findOne({ id: userId });

    return res.status(200).json(userInfo);
  } else if (req.method === 'POST') {
    const followerInfo = req.body;

    if (userId === followerInfo.id) {
      return res.json({
        status: 0,
        message: `failed (can't follow me)`,
      });
    }

    const followCheck = await db.collection('user').findOne({
      id: userId,
      follower: { $elemMatch: { id: followerInfo.id } },
    });
    const followedUser = await db
      .collection('user')
      .findOne(
        { id: userId },
        { projection: { _id: 0, id: 1, name: 1, imageUrl: 1 } },
      );

    if (followCheck === null) {
      await db
        .collection('user')
        .updateOne({ id: userId }, { $push: { follower: followerInfo } });

      await db
        .collection('user')
        .updateOne(
          { id: followerInfo.id },
          { $push: { following: followedUser } },
        );

      return res
        .status(200)
        .json({ status: 200, message: 'following success!' });
    } else {
      await db
        .collection('user')
        .updateOne(
          { id: userId },
          { $pull: { follower: { id: followerInfo.id } } },
        );

      await db
        .collection('user')
        .updateOne(
          { id: followerInfo.id },
          { $pull: { following: { id: userId } } },
        );

      return res
        .status(200)
        .json({ status: 200, message: 'following cancel success!' });
    }
  } else if (req.method === 'PATCH') {
    await db.collection('user').updateOne({ id: userId }, { $set: req.body });

    return res.json({ status: 0, message: 'succeced' });
  } else {
    return res.json({ status: 'possible only GET/POST/PATCH method' });
  }
}
