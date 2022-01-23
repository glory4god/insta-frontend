import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import BoardFavorite from 'lib/mongoDB/models/BoardFavorite';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from 'lib/middlewares';

const apiRoute = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(checkUser());

apiRoute.post(async (req: any, res: NextApiResponse) => {
  await dbConnect();

  const { boardId } = req.query;

  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }

  BoardFavorite.find(
    { boardId, username: req.user.username },
    (err: any, boardFav: any) => {
      if (!err) {
        if (boardFav.length === 0) {
          return res.status(200).json({ check: false });
        } else {
          return res.status(200).json({ check: true });
        }
      } else {
        return res
          .status(500)
          .json({ status: 400, message: 'push favorite failed' });
      }
    },
  );
});

export default apiRoute;
