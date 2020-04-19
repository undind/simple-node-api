import mongoose, { Schema, Document } from 'mongoose';

export interface IPosts extends Document {
  title: string,
  description: string,
  claps: number,
  userId: string,
  createdAt: string,
  updatedAt: string
}

const PostsSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  claps: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const PostsModel = mongoose.model<IPosts>('Posts', PostsSchema);

export default PostsModel;