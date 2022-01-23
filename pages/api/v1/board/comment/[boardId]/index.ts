import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import Board from 'lib/mongoDB/models/Board';
import BoardCmt from 'lib/mongoDB/models/Comment';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from 'lib/middlewares';

const apiRoute = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req: any, res: NextApiResponse) => {
  await dbConnect();
  const { boardId } = req.query;
  BoardCmt.aggregate(
    [
      { $match: { boardId } },
      {
        $lookup: {
          from: 'profiles',
          localField: 'username',
          foreignField: 'username',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          username: 1,
          boardId: 1,
          content: 1,
          createdDate: 1,
          imageUrl: '$user.imageUrl',
          name: '$user.name',
        },
      },
    ],
    (err: any, boardCmts: any) => {
      return res.status(200).json(boardCmts);
    },
  );
});

apiRoute.use(checkUser());

apiRoute.post(async (req: any, res: NextApiResponse) => {
  await dbConnect();

  const { boardId } = req.query;

  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }

  const board = await Board.find({ _id: boardId });

  if (board) {
    let cmt = new BoardCmt({
      content: req.body.content,
      boardId: boardId,
      username: req.user.username,
    });
    cmt.createdDate = new Date();
    cmt.save((err: any) => {
      if (err) {
        return res.status(500).json({ status: 400, message: 'save failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'save success' });
      }
    });
  } else {
    return res
      .status(500)
      .json({ status: 400, message: 'boardId doesnt exist' });
  }
});

apiRoute.delete(async (req: any, res: NextApiResponse) => {
  await dbConnect();

  const { boardId } = req.query;

  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }
  BoardCmt.findOneAndRemove(
    { boardId, username: req.user.username },
    (err: any, boardCmts: any) => {
      if (!boardCmts) {
        return res.status(500).json({ status: 400, message: 'delete failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'delete success' });
      }
    },
  );
});

export default apiRoute;
