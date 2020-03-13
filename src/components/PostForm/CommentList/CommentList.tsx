import Grid from '@material-ui/core/Grid';
import Comment from '../Comment/Comment';
import React, {FC} from 'react';
import {CommentItem} from '../../../utils/comments-api';
import CircularProgress from '@material-ui/core/CircularProgress';

interface CommentListProps {
  comments: CommentItem[] | undefined;
}

const CommentList: FC<CommentListProps> = ({comments}) => {
  if (comments === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container direction="column" spacing={2}>
        {comments.map(comment => (
          <Grid item key={comment._id}>
            <Comment commentItem={comment} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CommentList;
