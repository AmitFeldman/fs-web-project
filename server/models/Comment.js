import {Schema, model} from 'mongoose';

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'posts',
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model('comments', CommentSchema);

export default Comment;
