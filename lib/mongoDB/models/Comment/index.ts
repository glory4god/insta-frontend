import mongoose from 'mongoose';

export interface CommentProps {
  boardId: string;
  username: string;
  content: string;
  createdDate: Date;
}

const BoardCmtSchema = new mongoose.Schema<CommentProps>(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    boardId: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
      required: true,
      unique: false,
    },
    createdDate: {
      type: Date,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.BoardCmt ||
  mongoose.model('BoardCmt', BoardCmtSchema, 'boardComments');
