import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';
import Paper from '@material-ui/core/Paper';
import UserLink from '../../UserLink/UserLink';
import {formatDate} from '../../../utils/date-helper';

interface CommentProps {
  commentItem: CommentItem;
}

const Comment: FC<CommentProps> = ({commentItem: {date, comment, author}}) => {
  return (
    <Paper>
      <div>{comment}</div>
      <UserLink user={author} />
      <div>{formatDate(date)}</div>
    </Paper>
  );
};

export default Comment;
