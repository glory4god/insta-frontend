import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';
import Board from 'lib/mongoDB/models/Board';
import Follow from 'lib/mongoDB/models/Follow';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const authorization = req.headers.authorization;
  let user;
  if (authorization?.slice(undefined, 6) === 'Bearer') {
    user = await User.findOne({ token: authorization?.slice(7) });
  }
  const username = await Follow.aggregate([
    { $match: { follow: user.username } },
    { $project: { _id: 0, username: '$follower' } },
  ]);
  console.log('follow', username);
  // const renameKeys = (
  //   mapping: { [s: string]: unknown } | ArrayLike<unknown>,
  //   objArr: any,
  // ) => {
  //   const renamedObjArr = [];
  //   for (let obj of objArr) {
  //     const renamedObj: { [s: string]: string } = {};
  //     for (let [before, after] of Object.entries(mapping)) {
  //       if (obj[before]) {
  //         renamedObj[after] = obj[before];
  //       }
  //     }
  //     renamedObjArr.push(renamedObj);
  //   }
  //   return renamedObjArr;
  // };
  // const mapping = {
  //   follower: 'username',
  // };
  // const username = renameKeys(mapping, follow);
  // console.log('username', username);
  Board.aggregate(
    [
      { $addFields: { board_id: { $toString: '$_id' } } },
      {
        $match: {
          $or: username,
        },
      },
      {
        $lookup: {
          from: 'boardFavorites',
          localField: 'board_id',
          foreignField: 'boardId',
          as: 'favorites',
        },
      },
      {
        $lookup: {
          from: 'boardComments',
          localField: 'board_id',
          foreignField: 'boardId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'username',
          foreignField: 'username',
          as: 'profile',
        },
      },
      { $unwind: '$profile' },
      {
        $project: {
          _id: 1,
          username: 1,
          boardImageUrl: 1,
          content: 1,
          createdDate: 1,
          modifiedDate: 1,
          location: 1,
          comment: '$comments',
          profileImageUrl: '$profile.imageUrl',
          favoriteCnt: { $size: '$favorites' },
          commentCnt: { $size: '$comments' },
        },
      },
    ],
    (err: any, board: any) => {
      console.log('instagram', board);
      if (!board) {
        return res.status(200).json([
          {
            username: 'instagram',
            boardImageUrl: ['/instagramLogo.png'],
            content: '팔로워를 해보세요!',
            createdDate: '',
            modifiedDate: '',
            location: '',
            comment: '',
            profileImageUrl: '/instagramLogo.png',
            favoriteCnt: 0,
            commentCnt: 0,
          },
        ]);
      }
      return res.status(200).json(board);
    },
  );
}
