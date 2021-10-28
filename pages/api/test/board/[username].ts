import { NextApiRequest, NextApiResponse } from 'next';
import Board from 'lib/mongoDB/models/Board';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { username } = req.query;

  Profile.findOne(
    { username: username },
    { _id: 0, username: 1, name: 1, imageUrl: 1 },
    (err: any, profile: any) => {
      if (!profile) {
        return res.status(400).json({
          status: '400',
          message: `maybe this username(path) doesn't exist! /  input 'username' : ${username}`,
        });
      }

      Board.aggregate(
        [
          { $match: { username: username } },
          {
            $lookup: {
              from: 'boardFavorites',
              localField: '_id',
              foreignField: 'boardId',
              as: 'favorites',
            },
          },
          {
            $lookup: {
              from: 'boardComments',
              localField: '_id',
              foreignField: 'boardId',
              as: 'comments',
            },
          },
          {
            $project: {
              _id: 1,
              boardImageUrl: 1,
              content: 1,
              createdDate: 1,
              modifiedDate: 1,
              location: 1,
              favoriteCnt: { $size: '$favorites' },
              commentCnt: { $size: '$comments' },
            },
          },
        ],
        (err: any, board: any) => {
          if (!board) {
            return res.status(400).json({ status: 400, message: `get failed` });
          }
          return res.status(200).json({ writer: profile, boards: board });
        },
      );
    },
  );
}
