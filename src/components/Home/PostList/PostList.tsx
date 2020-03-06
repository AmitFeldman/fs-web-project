import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import {Post} from '../../../utils/posts-api';
import PostCard from '../PostCard/PostCard';
import {sortByDescendingDate} from '../../../utils/date-helper';

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({posts}) => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="stretch"
      justify="center">
      {posts.sort(sortByDescendingDate).map(post => (
        <Grid item key={post._id} xs={12}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
