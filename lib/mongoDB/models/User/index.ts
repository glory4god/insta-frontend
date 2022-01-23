import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const saltRounds = 10;

interface UserProps {
  name: string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  phonenumber: string;
  website: string;
  gender: string;
  introduction: string;
  verified: boolean;
  verifiedCode: string;
  token: string;
  tokenExp: number;
}

const userSchema = new Schema<UserProps>({
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
  introduction: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  verifiedCode: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this;
  console.log(user);
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword: string, cb: any) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb: any) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secret');
  var oneHour = moment().add(1, 'hour').valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err: any, user: any) {
    if (err) return cb(err);
    cb(null, user);
  });
};

export default models.User || model('User', userSchema, 'users');
