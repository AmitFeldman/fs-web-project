import React, {FC, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Post} from '../../../utils/posts-api';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DataFooter from '../../DataFooter/DataFooter';
import LikeWrapper from '../../LikeWrapper/LikeWrapper';

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
  onPostChange: (newPost: Post) => void;
}

const PostCard: FC<PostCardProps> = ({post, onPostChange}) => {
  const history = useHistory();
  const {header, paper} = useStyles();

  const redirectToPost = () => {
    history.push(`/post/${post._id}`);
  };

  return (
    <Box maxWidth="100%">
      <LikeWrapper post={post} onChange={onPostChange}>
        <Paper className={paper}>
          <header>
            <Typography
              noWrap
              onClick={redirectToPost}
              className={header}
              variant="h4">
              {post.title}
            </Typography>
          </header>

          <section>
            <Typography noWrap variant="body1">
              {post.body}
            </Typography>
            <Typography variant="caption">
              {post.comments.length} Comments
            </Typography>
          </section>

          <footer>
            <DataFooter user={post.author} date={post.date} />
          </footer>
        </Paper>
      </LikeWrapper>
    </Box>
  );
};

export default PostCard;
