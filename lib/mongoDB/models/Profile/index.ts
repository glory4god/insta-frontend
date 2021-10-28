import { Schema, model, models } from 'mongoose';

export interface Profileprops {
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  phone: string;
  website: string;
  gender: string;
  introduce: string;
}

const profileSchema = new Schema<Profileprops>({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
    unique: 1,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  imageUrl: {
    type: String,
  },
  website: {
    type: String,
  },
  gender: {
    type: String,
  },
  introduce: {
    type: String,
  },
});

export default models.Profile || model('Profile', profileSchema, 'profiles');
