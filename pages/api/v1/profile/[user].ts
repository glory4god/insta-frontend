import { getUserBoard } from 'lib/redux/profile/profileApis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.query;
  var userInfo = {};
  if (typeof username === 'string') {
    userInfo = await getUserBoard(username);
  }
  res.status(200).json(userInfo);
}
