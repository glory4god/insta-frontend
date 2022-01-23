import nextConnect from 'next-connect';

import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';
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

apiRoute.get(async (req: any, res: NextApiResponse) => {
	await dbConnect();
	console.log(req.user);
	const { user }: any = req.query;
	const data = await Profile.find(
		{ $or: [{ username: new RegExp(user) }, { name: new RegExp(user) }] },
		{ _id: 0, imageUrl: 1, username: 1, name: 1 }
	);

	res.status(200).json(data);
});

apiRoute.delete(async (req: any, res: NextApiResponse) => {
	await dbConnect();
	console.log(req)
	const { user }: any = req.query;
	const data = await SearchHistory.deleteOne({ searcher: req.user.username, searched: user });

	res.status(200).json(data);
});

export default apiRoute;