import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser extends Document {
  email: string,
  password: string,
  role: string,
  last_seen?: string,
  id: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email обязателен!',
    validate: [isEmail, 'Не верный Email'],
    unique: true
  },
  password: {
    type: String,
    required: 'Пароль обязателен'
  },
  role: {
    type: String,
    default: 'writer'
  },
  last_seen: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;