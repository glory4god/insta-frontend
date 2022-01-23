import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';
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
  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }
  await Profile.updateOne(
    { username: req.user.username },
    {
      $set: req.body
    }
  );

  return res.status(200).json({ success: true });
});

apiRoute.get(async (req: any, res: NextApiResponse) => {
  await dbConnect();
  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }

  const profile = await Profile.findOne({ username: req.user.username });

  return res.status(200).json(profile);
});


export default apiRoute;
