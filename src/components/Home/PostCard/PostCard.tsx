import React, {FC, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Post} from '../../../utils/posts-api';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DataFooter from '../../DataFooter/DataFooter';
import LikePost from '../../LikePost/LikePost';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({
  post: {_id, title, body, comments, author, date, likes},
}) => {
  const [localLikes, setLocalLikes] = useState<string[]>(likes);
  const history = useHistory();
  const {header, paper} = useStyles();

  useEffect(() => {
    setLocalLikes(likes);
  }, [likes]);

  const redirectToPost = () => {
    history.push(`/post/${_id}`);
  };

  return (
    <Box maxWidth="100%">
      <Grid container>
        <Grid
          item
          xs={1}
          container
          direction="column"
          justify="center"
          alignItems="center">
          <Grid item>
            <Typography variant="h6">{localLikes.length}</Typography>
          </Grid>
          <Grid item>
            <LikePost
              postId={_id}
              likes={localLikes}
              onChange={newLikes => setLocalLikes(newLikes)}
            />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Paper className={paper}>
            <header>
              <Typography
                noWrap
                onClick={redirectToPost}
                className={header}
                variant="h4">
                {title}
              </Typography>
            </header>

            <section>
              <Typography noWrap variant="body1">
                {body}
              </Typography>
              <Typography variant="caption">
                {comments.length} Comments
              </Typography>
            </section>

            <footer>
              <DataFooter user={author} date={date} />
            </footer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostCard;
