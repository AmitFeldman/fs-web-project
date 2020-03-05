import React, {FC, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Post, getPosts} from '../../../utils/posts-api';
import PostCard from '../PostCard/PostCard';
import {onSocketEvent} from '../../../utils/socket-client';
import {sortByDescendingDate} from '../../../utils/date-helper';

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(result => {
      setPosts(result);
    });
  }, []);

  useEffect(() => {
    const cancelOnSocketEvent = onSocketEvent<Post>('NEW_POST', newPost => {
      setPosts(currPosts => [newPost, ...currPosts]);
    });

    return () => {
      cancelOnSocketEvent();
    };
  }, []);

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
