import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Post} from '../../../utils/posts-api';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DataFooter from '../../DataFooter/DataFooter';

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
  const history = useHistory();
  const {header, paper} = useStyles();

  const redirectToPost = () => {
    history.push(`/post/${post._id}`);
  };

  return (
    <Box maxWidth="100%">
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
    </Box>
  );
};

export default PostCard;
