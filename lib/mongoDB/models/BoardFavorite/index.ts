import mongoose from 'mongoose';

export interface FavoriteProps {
  commentsId: string;
  username: string;
  createDate: Date;
}

const BoardFavSchema = new mongoose.Schema<FavoriteProps>({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  commentsId: {
    type: String,
    required: true,
    unique: false,
  },
  createDate: {
    type: Date,
    unique: false,
  },
});

export default mongoose.models.BoardFav ||
  mongoose.model('BoardFav', BoardFavSchema, 'boardFavorites');
