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
}

const PostCard: FC<PostCardProps> = ({post}) => {
  const [localPost, setLocalPost] = useState<Post>(post);
  const history = useHistory();
  const {header, paper} = useStyles();

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const redirectToPost = () => {
    history.push(`/post/${localPost._id}`);
  };

  return (
    <Box maxWidth="100%">
      <LikeWrapper post={localPost} onChange={setLocalPost}>
        <Paper className={paper}>
          <header>
            <Typography
              noWrap
              onClick={redirectToPost}
              className={header}
              variant="h4">
              {localPost.title}
            </Typography>
          </header>

          <section>
            <Typography noWrap variant="body1">
              {localPost.body}
            </Typography>
            <Typography variant="caption">
              {localPost.comments.length} Comments
            </Typography>
          </section>

          <footer>
            <DataFooter user={localPost.author} date={localPost.date} />
          </footer>
        </Paper>
      </LikeWrapper>
    </Box>
  );
};

export default PostCard;
