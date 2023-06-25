import mongoose, { Schema, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  username: string;
  name: string;
  hash: string;
  salt: string;
  validPassword(password: string): boolean;
  generateJWT(): string;
  toAuthJSON(): { username: string; name: string; token: string };
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  name: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

userSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function (): string {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt((exp.getTime() / 1000).toString()),
    },
    process.env.APP_SECRET || ''
  );
};

userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    name: this.name,
    token: this.generateJWT(),
  };
};

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;