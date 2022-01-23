import { checkUser } from 'lib/middlewares';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import Follow from 'lib/mongoDB/models/Follow';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const apiRoute = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(checkUser());

apiRoute.get(async (req: any, res: NextApiResponse) => {
  await dbConnect();

  const { userId } = req.query;

  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }
  Follow.find(
    { follower: req.user.username, follow: userId },
    (err: any, follow: any) => {
      if (!err) {
        if (follow.length === 0) {
          return res.status(200).json({ check: false });
        } else {
          return res.status(200).json({ check: true });
        }
      } else {
        return res.status(500).json({ status: 400, message: 'failed' });
      }
    },
  );
});

export default apiRoute;
