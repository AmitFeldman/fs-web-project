import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DataFooter from '../../DataFooter/DataFooter';

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
      <br />
      <DataFooter user={author} date={date} />
    </Paper>
  );
};

export default Comment;
