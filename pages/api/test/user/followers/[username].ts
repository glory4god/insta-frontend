import { dbConnect } from 'lib/mongoDB/dbConnect';
import Follow from 'lib/mongoDB/models/Follow';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { username } = req.query;

  if (req.method === 'GET') {
    Follow.aggregate(
      [
        { $match: { follow: username, amount: { $gte: 300, $lte: 500 } } },
        { $group: { _id: '$follow', totalAmount: { $sum: '$amount' } } },
        {
          $project: {
            sensorid: '$_id',
            _id: 0,
            totalAmount: 1,
          },
        },
      ],
      (err: any, follow: any) => {
        return res.status(200).json(follow);
      },
    );
  }
}
