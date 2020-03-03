import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';
import Paper from '@material-ui/core/Paper';
import UserLink from '../../UserLink/UserLink';

interface CommentProps {
  commentItem: CommentItem;
}

const Comment: FC<CommentProps> = ({commentItem}) => {
  const {comment, author} = commentItem;

  return (
    <Paper>
      <div>{comment}</div>
      <UserLink user={author} />
    </Paper>
  );
};

export default Comment;
