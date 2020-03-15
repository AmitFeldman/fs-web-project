import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import {Post} from '../../../utils/posts-api';
import PostCard from '../PostCard/PostCard';
import LikeWrapper from '../../LikeWrapper/LikeWrapper';

interface PostListProps {
  posts: Post[];
  onPostLike?: (post: Post) => void;
}

const PostList: FC<PostListProps> = ({posts, onPostLike}) => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="stretch"
      justify="center">
      {posts.map(post => (
        <Grid item key={post._id} xs={12}>
          {onPostLike ? (
            <LikeWrapper post={post} onChange={onPostLike}>
              <PostCard post={post} />
            </LikeWrapper>
          ) : (
            <PostCard post={post} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
