import {User} from './users-api';
import client from './api-client';

export interface CommentItem {
  _id: string;
  author: User;
  post: string;
  comment: string;
}

export interface CreateCommentBody extends Pick<CommentItem, 'comment'> {
  postId: string;
}

const createComment = async (
  createCommentBody: CreateCommentBody
): Promise<CommentItem> => {
  return await client<CreateCommentBody, CommentItem>('comments/create', {
    body: createCommentBody,
  });
};

export {createComment};
