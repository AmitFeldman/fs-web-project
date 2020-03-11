import client from './api-client';
import {User} from './users-api';
import {CommentItem} from './comments-api';
import {BasicType} from '../types/basic-type';

export interface Post extends BasicType {
  author: User;
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

type IdArray = Post['_id'][];

const getPostById = async (id: Post['_id']): Promise<PostWithComments> => {
  return await client<{}, PostWithComments>(`posts/id/${id}`);
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

export {getPosts, createPost, getPostById, likePost, unlikePost};
