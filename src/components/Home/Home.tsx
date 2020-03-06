import React, {FC, useEffect, useState} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {getPosts, Post} from '../../utils/posts-api';
import {onSocketEvent} from '../../utils/socket-client';
import {useAuth} from '../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textShadow: `1.5px 1.5px ${theme.palette.text.hint}`,
    },
    container: {
      width: '80%',
    },
  })
);

const Home: FC = () => {
  const {header, container} = useStyles();
  const {user} = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostCounter, setNewPostCounter] = useState<number>(0);

  useEffect(() => {
    getPosts().then(result => {
      setPosts(result);
    });
  }, []);

  useEffect(() => {
    const cancelOnSocketEvent = onSocketEvent<Post>('NEW_POST', newPost => {
      // @ts-ignore
      if (newPost.author !== user?._id) setNewPostCounter(count => count + 1);
    });

    return () => {
      cancelOnSocketEvent();
    };
  }, [user]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item xs={12} className={container}>
        <CreatePost
          onCreatePost={newPost => {
            setPosts(currPosts => [newPost, ...currPosts]);
          }}
        />
      </Grid>
      <Grid item xs={12} className={container}>
        <Typography variant="h4" className={header}>
          Latest Posts{' '}
          {newPostCounter !== 0 && `- New Posts: ${newPostCounter}`}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={8}>
        <PostList posts={posts} />
      </Grid>
    </Grid>
  );
};

export default Home;
