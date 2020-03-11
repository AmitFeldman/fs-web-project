import {User} from './users-api';
import client from './api-client';
import {BasicType} from '../types/basic-type';
import {DateCountData} from './posts-api';

export interface CommentItem extends BasicType {
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

const getCommentsPerDateCount = async (): Promise<DateCountData[]> => {
  return await client<{}, DateCountData[]>('comments/stats-days');
};

export {createComment, getCommentsPerDateCount};
