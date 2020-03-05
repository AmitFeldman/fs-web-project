import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Post} from '../../../utils/posts-api';
import {useHistory} from 'react-router-dom';
import UserLink from '../../UserLink/UserLink';
import {formatDate} from '../../../utils/date-helper';
import Box from '@material-ui/core/Box';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

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
  const {_id, title, body, comments, author, date} = post;
  const history = useHistory();
  const {header, paper} = useStyles();

  const redirectToPost = () => {
    history.push(`/post/${_id}`);
  };

  return (
    <Box maxWidth="100%">
      <Paper className={paper}>
        <header>
          <Typography onClick={redirectToPost} className={header} variant="h4">
            {title}
          </Typography>
        </header>

        <section>
          <Typography noWrap variant="body1">
            {body}
          </Typography>
          <Typography variant="caption">{comments.length} Comments</Typography>
        </section>

        <footer>
          <Typography variant="caption">
            Submitted {formatDate(date)} by{' '}
            <UserLink user={author}>
              <Typography variant="caption">{author.username}</Typography>
            </UserLink>
          </Typography>
        </footer>
      </Paper>
    </Box>
  );
};

export default PostCard;
