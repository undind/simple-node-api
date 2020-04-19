import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email adress is required',
    validate: [isEmail, 'Invalid Email'],
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  role: {
    type: String,
    default: 'reader'
  },
  confirm_hash: String,
  last_seen: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;