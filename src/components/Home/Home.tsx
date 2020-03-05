import React, {FC} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

  return (
    <Grid container direction="column" spacing={2} alignItems="center" xs={12}>
      <Grid item xs={12} className={container}>
        <CreatePost />
      </Grid>
      <Grid item xs={12} className={container}>
        <Typography variant="h4" className={header}>
          Latest Posts
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={8}>
        <PostList />
      </Grid>
    </Grid>
  );
};

export default Home;
