import React, {FC, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Post, getPosts} from '../../../utils/posts-api';
import PostCard from '../PostCard/PostCard';

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(result => {
      setPosts(result);
    });
  }, []);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      {posts.map(post => (
        <Grid item key={post._id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
