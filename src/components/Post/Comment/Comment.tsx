import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';
import Paper from '@material-ui/core/Paper';
import UserLink from '../../UserLink/UserLink';
import {formatDate} from '../../../utils/date-helper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
  })
);

interface CommentProps {
  commentItem: CommentItem;
}

const Comment: FC<CommentProps> = ({commentItem: {date, comment, author}}) => {
  const {paper} = useStyles();

  return (
    <Paper className={paper}>
      <Typography variant="body2">{comment}</Typography>

      <Typography variant="caption">
        Submitted {formatDate(date)} by{' '}
        <UserLink user={author}>
          <Typography variant="caption">{author.username}</Typography>
        </UserLink>
      </Typography>
    </Paper>
  );
};

export default Comment;
