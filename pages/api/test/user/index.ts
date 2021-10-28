import { dbConnect } from 'lib/mongoDB/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from 'lib/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('connect?');
  await dbConnect();
  console.log('connect!');

  await User.find({}).then((datas: any) => {
    res.status(200).json(datas);
  });
}
