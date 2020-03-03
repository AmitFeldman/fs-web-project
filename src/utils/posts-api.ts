import client from './api-client';
import {User} from './users-api';
import {CommentItem} from './comments-api';

export interface Post {
  _id: string;
  author: User;
  title: string;
  body: string;
  comments: string[];
}

export interface PostWithComments {
  _id: string;
  author: User;
  title: string;
  body: string;
  comments: CommentItem[];
}

const getPosts = async (): Promise<Post[]> => {
  return await client<{}, Post[]>('posts');
};

const getPostById = async (id: Post['_id']): Promise<PostWithComments> => {
  return await client<{}, PostWithComments>(`posts/id/${id}`);
};

export type CreatePostBody = Pick<Post, 'title' | 'body'>;

const createPost = async (createPostData: CreatePostBody): Promise<Post> => {
  return await client<CreatePostBody, Post>('posts/create', {
    body: createPostData,
  });
};

export {getPosts, createPost, getPostById};
