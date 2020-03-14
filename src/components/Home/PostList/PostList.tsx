import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import {Post} from '../../../utils/posts-api';
import PostCard from '../PostCard/PostCard';

interface PostListProps {
  posts: Post[];
  onPostChange: (post: Post) => void;
}

const PostList: FC<PostListProps> = ({posts, onPostChange}) => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="stretch"
      justify="center">
      {posts.map(post => (
        <Grid item key={post._id} xs={12}>
          <PostCard post={post} onPostChange={onPostChange} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
