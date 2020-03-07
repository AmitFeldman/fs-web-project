import {Schema, model} from 'mongoose';

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'comments'}],
  likes: [{type: Schema.Types.ObjectId, ref: 'users'}],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model('posts', PostSchema);

export default Post;
