import {User} from './users-api';

export interface CommentItem {
  _id: string;
  author: User;
  comment: string;
}
