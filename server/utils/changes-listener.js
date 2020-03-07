import Post from '../models/Post';
import {emitEvent} from './socket-service';
import BsonObjectId from 'bson-objectid';

const NEW_POST_EVENT = 'NEW_POST';

const options = {fullDocument: 'updateLookup'};

const bsonToObjectId = bsonItem => BsonObjectId(bsonItem.id).str;

const initChangesListener = () => {
  Post.watch(
    [
      {$match: {operationType: {$in: ['insert', 'update', 'replace']}}},
      {$project: {fullDocument: 1}},
    ],
    options
  ).on('change', data => {
    const newPost = data.fullDocument;

    newPost._id = bsonToObjectId(newPost._id);
    newPost.author = bsonToObjectId(newPost.author);

    onNewPost(newPost);
  });
};

const onNewPost = postId => {
  emitEvent(NEW_POST_EVENT, postId);
};

export {initChangesListener};
