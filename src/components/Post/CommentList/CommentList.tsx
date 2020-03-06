import Grid from '@material-ui/core/Grid';
import {sortByDescendingDate} from '../../../utils/date-helper';
import Comment from '../Comment/Comment';
import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';

interface CommentListProps {
  comments: CommentItem[];
}

const CommentList: FC<CommentListProps> = ({comments}) => {
  return (
    <Grid container direction="column" spacing={2}>
      {comments.sort(sortByDescendingDate).map(comment => (
        <Grid item key={comment._id}>
          <Comment commentItem={comment} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CommentList;
