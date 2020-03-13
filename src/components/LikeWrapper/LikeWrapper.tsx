import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LikeButton from './LikeButton/LikeButton';
import {Post} from '../../utils/posts-api';

interface LikeWrapperProps {
  post: Post;
  onChange: (newPost: Post) => void;
}

const LikeWrapper: FC<LikeWrapperProps> = ({children, post, onChange}) => {
  return (
    <Grid container>
      <Grid
        item
        xs={1}
        container
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item>
          <Typography variant="h6">{post.likes.length}</Typography>
        </Grid>
        <Grid item>
          <LikeButton
            postId={post._id}
            likes={post.likes}
            onChange={newLikes => onChange({...post, likes: newLikes})}
          />
        </Grid>
      </Grid>
      <Grid item xs={11}>
        {children}
      </Grid>
    </Grid>
  );
};

export default LikeWrapper;
