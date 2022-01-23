import mongoose from 'mongoose';

export interface BoardProps {
  username: string;
  name: string;
  imageUrl: string;
  boardImageUrl: string[];
  content: string;
  location: string;
  createdDate: Date;
  modifiedDate: Date;
}

const BoardSchema = new mongoose.Schema<BoardProps>({
  username: {
    type: String,
    required: [true, 'Please add a id'],
    unique: true,
    trim: true,
    maxlength: [12, 'id cannot be more than 12 char'],
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: false,
    trim: true,
    maxlength: [10, 'name cannot be more than 10 char'],
  },
  imageUrl: {
    type: String,
    unique: false,
  },
  boardImageUrl: {
    type: [String],
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: String,
    unique: false,
  },
  createdDate: {
    type: Date,
    required: true,
    unique: false,
  },
  modifiedDate: {
    type: Date,
    required: true,
    unique: false,
  },
});

export default mongoose.models.Board ||
  mongoose.model('Board', BoardSchema, 'boards');
