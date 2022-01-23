import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from 'lib/middlewares';
import User from 'lib/mongoDB/models/User';
import bcrypt from 'bcrypt';

const saltRounds = 10;

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
  User.findOne({ username: req.user.username }, (err: any, user: any) => {
    user.comparePassword(req.body.prev, (err: any, isMatch: any) => {
      if (!isMatch)
        return res.status(400).json({
          success: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.new, salt, function (err, hash) {
          User.findOneAndUpdate(
            { username: req.user.username },
            {
              $set: {
                password: hash
              }
            },
            { returnOriginal: false },
            function (err, documents) {
              console.log('documents');
              return res.status(200).json({ success: true });
            }
          );
        });
      });
    });
  });


});

export default apiRoute;
