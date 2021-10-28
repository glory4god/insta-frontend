import mongoose from 'mongoose';

export interface CommentProps {
  boardId: string;
  username: string;
  content: string;
  createDate: Date;
}

const BoardCmtSchema = new mongoose.Schema<CommentProps>({
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
  createDate: {
    type: Date,
    unique: false,
  },
});

export default mongoose.models.BoardCmt ||
  mongoose.model('BoardCmt', BoardCmtSchema, 'boardComments');
