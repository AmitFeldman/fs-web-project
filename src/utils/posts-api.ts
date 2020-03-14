import client from './api-client';
import {User} from './users-api';
import {CommentItem} from './comments-api';
import {BasicType} from '../types/basic-type';

export interface Post extends BasicType {
  author: User | undefined;
  title: string;
  body: string;
  comments: string[];
  likes: string[];
}

export interface BasicPost extends Omit<Post, 'author'> {
  author: string;
}

export interface PostWithComments extends Omit<Post, 'comments'> {
  comments: CommentItem[];
}

const getPosts = async (): Promise<Post[]> => {
  return await client<{}, Post[]>('posts');
};

const getRecommendedPosts = async (): Promise<Post[]> => {
  return await client<{}, Post[]>('posts/recommended');
};

const getPostById = async (id: Post['_id']): Promise<Post> => {
  return await client<{}, Post>(`posts/id/${id}`);
};

export type CreatePostBody = Pick<Post, 'title' | 'body'>;

const createPost = async (createPostData: CreatePostBody): Promise<Post> => {
  return await client<CreatePostBody, Post>('posts/create', {
    body: createPostData,
  });
};

interface PostToggleLikeBody {
  postId: Post['_id'];
}

const likePost = async (postId: Post['_id']): Promise<BasicPost> => {
  return await client<PostToggleLikeBody, BasicPost>('posts/like', {
    body: {postId},
    method: 'PUT',
  });
};

const unlikePost = async (postId: Post['_id']): Promise<BasicPost> => {
  return await client<PostToggleLikeBody, BasicPost>('posts/unlike', {
    body: {postId},
    method: 'PUT',
  });
};

export interface DateCountData {
  count: number;
  date: string;
}

const getPostsPerDayCount = async (): Promise<DateCountData[]> => {
  return await client<{}, DateCountData[]>('posts/stats-days');
};

export {
  getPosts,
  getRecommendedPosts,
  createPost,
  getPostById,
  likePost,
  unlikePost,
  getPostsPerDayCount,
};
