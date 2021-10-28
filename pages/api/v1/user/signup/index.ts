import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'instacodesend@gmail.com',
    pass: 'insta1234!',
  },
});

const generateRandomCode = () => {
  let str = '';
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      const randomCode = generateRandomCode();
      req.body = { ...req.body, verifiedCode: randomCode, verified: false };
      const user = new User(req.body);

      User.findOne({ email: req.body.email }, (err: any, data: any) => {
        if (data?.email === req.body.email) {
          return res.status(409).json({
            success: false,
            message: '중복된 EMAIL 이 존재합니다.',
          });
        }

        User.findOne({ username: req.body.username }, (err: any, data: any) => {
          if (data?.username === req.body.username) {
            return res.status(409).json({
              success: false,
              message: '이미 존재하는 USERNAME 입니다.',
            });
          }

          user.save((err: any, doc: any) => {
            if (err) return res.status(500).json({ success: false, err });
            const mailOptions = {
              from: 'instacodesend@gmail.com',
              to: user.email,
              subject: '[인스타그램 회원가입 이메일 인증]',
              text: `[이메일 인증] 인증 번호는 ${randomCode}입니다`,
            };
            transporter.sendMail(mailOptions, (err: any, data: any) => {
              if (err) {
                console.error(err);
                res.status(500).json({ success: false, err });
              } else {
                res.status(200).json({ success: true });
              }
            });
          });
        });
      });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
