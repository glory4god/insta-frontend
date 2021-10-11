import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const saltRounds = 10;

interface User {
  name: string;
  id: string;
  email: string;
  password: string;
  imageUrl: string;
  phonenumber: string;
  website: string;
  gender: string;
  description: string;
  token: string;
  tokenExp: number;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    trim: true,
  },
  id: {
    type: String,
    trim: true,
    unique: 1,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 6,
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
  description: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = model('User', userSchema);

module.exports = { User };
