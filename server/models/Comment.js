import {Schema, model} from 'mongoose';
import User from './User';
import Post from './Post';

const CommentSchema = new Schema({
  author: {
    type: User,
    required: true
  },
  post: {
    type: Post,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Comment = model("users", CommentSchema);

export default Comment;
