import { dbConnect } from 'lib/mongoDB/dbConnect';
import nextConnect from 'next-connect';

import User from 'lib/mongoDB/models/User';
import Board from 'lib/mongoDB/models/Board';

import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

var storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (_req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

const uploadMiddleware = upload.array('file');

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req: any, res: any) => {
  await dbConnect();
  const authorization = req.headers.authorization;
  let user;
  if (authorization?.slice(undefined, 6) === 'Bearer') {
    user = await User.findOne({ token: authorization?.slice(7) });
  }
  const boardImageUrl = req.files.map((file: { path: string }) =>
    file.path.replace(/public/gi, '').replace(/\\/gi, '/'),
  );
  const boardData = {
    username: user.username,
    name: user.name,
    content: req.body.content,
    boardImageUrl: boardImageUrl,
    createdDate: new Date(),
    modifiedDate: new Date(),
  };
  const board = new Board(boardData);
  board.save((err: any, doc: any) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { method } = req;
//   await dbConnect();
//   switch (method) {
//     case 'POST':
//       // console.log('req');
//       console.log('req.body', req.body);
//       upload.array('file');
//       // upload(req, res, (err) => {
//       //   if (err) {
//       //     console.log('error');
//       //     return res.json({ success: false, err });
//       //   }
//       //   console.log('성공');
//       //   return res.json({ success: true });
//       // });

//       // const authorization = req.headers.authorization;
//       // let user;
//       // if (authorization?.slice(undefined, 6) === 'Bearer') {
//       //   user = await User.findOne({ token: authorization?.slice(7) });
//       // }

//       // var file = dataUrlToFile(req.body[0].croppedImage, 'test.gif', 'image/gif');
//       break;
//     default:
//       res.status(500).json({ success: false });
//       break;
//   }
// }
