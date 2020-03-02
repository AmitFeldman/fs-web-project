import {Schema, model} from 'mongoose';
import User from './User';

const PostSchema = new Schema({
  comments: {
    type: [Comment],
    required: true
  },
  author: {
    type: User,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Post = model("users", PostSchema);

export default Post;
