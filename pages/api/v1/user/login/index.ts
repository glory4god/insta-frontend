import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      User.findOne({ email: req.body.email }, (err: any, user: any) => {
        if (!user)
          return res.status(404).json({
            success: false,
            message: '해당 유저 정보를 찾을 수 없습니다.',
          });

        user.comparePassword(req.body.password, (err: any, isMatch: any) => {
          if (!isMatch)
            return res.status(400).json({
              success: false,
              message: '비밀번호가 일치하지 않습니다.',
            });

          if (!user.verified)
            return res.status(401).json({
              success: false,
              message:
                '이메일 인증이 되지 않았습니다. 이메일 활성화 후 다시 로그인해주세요.',
            });

          user.generateToken((err: any, user: any) => {
            if (err) return res.status(400).send(err);
            const profileImageUrl = user.profileImageUrl
              ? user.profileImageUrl
              : '';
            return res.status(200).json({
              username: user.username,
              name: user.name,
              profileImageUrl: profileImageUrl,
              accessToken: user.token,
            });
          });
        });
      });
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
}
