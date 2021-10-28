import mongoose from 'mongoose';

export interface FollowProps {
  follower: string;
  follow: string;
  createDate: Date;
  amount: number;
}

const FollowSchema = new mongoose.Schema<FollowProps>({
  follower: {
    type: String,
    required: true,
    unique: false,
  },
  follow: {
    type: String,
    required: true,
    unique: false,
  },
  createDate: {
    type: Date,
    unique: false,
  },
  amount: {
    type: Number,
    unique: false,
  },
});

export default mongoose.models.Follow ||
  mongoose.model('Follow', FollowSchema, 'follows');
