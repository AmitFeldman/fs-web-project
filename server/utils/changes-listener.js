import Post from '../models/Post';
import {emitEvent} from './socket-service';
import BsonObjectId from 'bson-objectid';
import User from '../models/User';

const NEW_POST_EVENT = 'NEW_POST';

const pipeline = [
  {$match: {operationType: {$in: ['insert']}}},
  {$project: {fullDocument: 1}},
];
const options = {fullDocument: 'updateLookup'};

const bsonToObjectId = bsonItem => BsonObjectId(bsonItem.id).str;

const initChangesListener = () => {
  Post.watch(pipeline, options).on('change', data => {
    const newPost = data.fullDocument;

    newPost._id = bsonToObjectId(newPost._id);
    newPost.author = bsonToObjectId(newPost.author);

    User.findById(newPost.author)
      .then(user => {
        newPost.author = user;
        onNewPost(newPost);
      })
      .catch(() => {
        return console.log('ChangesListener ERROR: author not found');
      });
  });
};

const onNewPost = postId => {
  emitEvent(NEW_POST_EVENT, postId);
};

export {initChangesListener};
