import React, {FC} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createContainer: {
      width: '80%',
    },
  })
);

const Home: FC = () => {
  const {createContainer} = useStyles();

  return (
    <Grid container direction="column" spacing={6} alignItems="center">
      <Grid item className={createContainer}>
        <CreatePost />
      </Grid>
      <Grid item>
        <PostList />
      </Grid>
    </Grid>
  );
};

export default Home;
