import mongoose from 'mongoose';

export interface FavoriteProps {
  boardId: string;
  username: string;
  createDate: Date;
}

const BoardFavSchema = new mongoose.Schema<FavoriteProps>(
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
    createDate: {
      type: Date,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.BoardFavorite ||
  mongoose.model('BoardFavorite', BoardFavSchema, 'boardFavorites');
