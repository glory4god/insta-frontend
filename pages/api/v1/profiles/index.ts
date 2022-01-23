import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import SearchHistory from 'lib/mongoDB/models/SearchHistory';
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

apiRoute.put(async (req: any, res: NextApiResponse) => {
	await dbConnect();

	if (!req.user) {
		return res.status(405).json({ status: 405, message: 'user doesnt exist' });
	}
	const data = {
		searcher: req.user.username,
		searched: req.body.searched,
	}
	const searchHistory = new SearchHistory(data);
	const searcher = await SearchHistory.findOne({ searcher: req.user.username, searched: req.body.searched })
	if (searcher) {
		await SearchHistory.findOneAndUpdate(
			{ searcher: req.user.username, searched: req.body.searched },
			{ searcher: req.user.username, searched: req.body.searched }
		)
		return res.status(200).json({ success: true });
	} else {
		searchHistory.save(
			(err: any, doc: any) => {
				if (!err) {
					return res.status(200).json({ success: true });
				} else {
					return res
						.status(400)
						.json({ status: 400, message: 'push searchHistory failed' });
				}
			},
		);
	}
});

apiRoute.get(async (req: any, res: NextApiResponse) => {
	await dbConnect();

	if (!req.user) {
		return res.status(405).json({ status: 405, message: 'user doesnt exist' });
	}

	SearchHistory.aggregate(
		[
			{ $match: { searcher: req.user.username } },
			{
				$lookup: {
					from: 'profiles',
					localField: 'searched',
					foreignField: 'username',
					as: 'profile',
				},
			},
			{ $unwind: '$profile' },
			{
				$project: {
					_id: 0,
					username: '$searched',
					name: '$profile.name',
					imageUrl: '$profile.imageUrl',
					updatedAt: 1,
				},
			},
			{ $sort: { updatedAt: -1 } }
		],
		(err: any, searchHistories: any) => {
			return res.status(200).json(searchHistories);
		},
	);
});

apiRoute.delete(async (req: any, res: NextApiResponse) => {
	await dbConnect();

	if (!req.user) {
		return res.status(405).json({ status: 405, message: 'user doesnt exist' });
	}

	const data = await SearchHistory.deleteMany({ searcher: req.user.username });

	res.status(200).json(data);
});

export default apiRoute;
