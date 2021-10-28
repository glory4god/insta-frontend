import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDb/models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      User.findOne({ email: req.body.email }, (err: any, data: any) => {
        if (err) return res.json({ success: false, err });
        if (data?.verifiedCode !== req.body.authCode) {
          return res.status(400).json({
            success: false,
            message: "인증코드가 일치하지 않습니다."
          });
        }

        User.findOneAndUpdate({ email: req.body.email }, { verified: true }, (err: any, data: any) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({
            success: true
          });
        });
      });
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
}
