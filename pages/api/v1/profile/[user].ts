import { getUserBoard } from 'lib/redux/profile/profileApis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user } = req.query;
  var userInfo = {};
  if (typeof user === 'string') {
    userInfo = await getUserBoard(user);
  }
  res.status(200).json(userInfo);
}
