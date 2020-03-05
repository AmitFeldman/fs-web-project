import Post from '../models/Post';
import {emitEvent} from './socket-service';

const NEW_POST_EVENT = 'NEW_POST';

// Todo: change to mongo watch
// Post.watch().on('insert', data => {
//   callback(data);
// });

const onNewPost = (post) => {
  emitEvent('NEW_POST', post);
};

export {onNewPost};
