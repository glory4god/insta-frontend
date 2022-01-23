import nextConnect from 'next-connect';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import Profile from 'lib/mongoDB/models/Profile';

import { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from 'lib/middlewares';

import multer from 'multer';

var storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/profile/');
  },
  filename: (_req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}.png`);
  },
});
var upload = multer({ storage: storage });

const uploadMiddleware = upload.single('file');

const apiRoute = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(checkUser());
apiRoute.use(uploadMiddleware);

apiRoute.post(async (req: any, res: NextApiResponse) => {
  await dbConnect();
  if (!req.user) {
    return res.status(405).json({ status: 405, message: 'user doesnt exist' });
  }
  await Profile.updateOne({
    username: req.user.username
  },
    {
      $set: {
        imageUrl: `/profile/${req.file.filename}`
      }
    })

  return res.status(200).json({ profileImageUrl: `/profile/${req.file.filename}` });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
