import User from 'lib/mongoDB/models/User';
import { NextApiResponse } from 'next';

export const checkUser = () => {
  return async (req: any, res: NextApiResponse, next: any) => {
    let token = req.headers.authorization;
    if (token) {
      let user =
        token.slice(undefined, 6) === 'Bearer'
          ? await User.findOne({ token: token.slice(7) })
          : undefined;

      req.user = user;
    } else {
      return res.status(405).json({ error: 'There is no token' });
    }
    next();
  };
};
