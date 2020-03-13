import {User} from './users-api';
import client from './api-client';
import {BasicType} from '../types/basic-type';
import {DateCountData} from './posts-api';

export interface CommentItem extends BasicType {
  author: User | undefined;
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

export interface GetCommentsBody {
  postId: string;
  fromDateFilter?: string;
  toDateFilter?: string;
  authorFilter?: string;
  commentFilter?: string;
}

const getComments = async (
  getCommentsBody: GetCommentsBody
): Promise<CommentItem[]> => {
  return await client<GetCommentsBody, CommentItem[]>('comments', {
    body: getCommentsBody,
  });
};

const getCommentsPerDateCount = async (): Promise<DateCountData[]> => {
  return await client<{}, DateCountData[]>('comments/stats-days');
};

export {createComment, getCommentsPerDateCount, getComments};
