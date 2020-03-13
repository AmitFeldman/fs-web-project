import React, {FC} from 'react';
import {useAuth} from '../../../context/AuthContext';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import {likePost, unlikePost} from '../../../utils/posts-api';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {pink} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: pink['500'],
      '&:hover': {
        color: pink.A100,
        cursor: 'pointer',
      },
    },
  })
);

interface LikePostProps {
  postId: string;
  likes: string[];
  onChange?: (newLikes: string[]) => void;
}

const LikeButton: FC<LikePostProps> = ({
  postId,
  likes,
  onChange = () => {},
}) => {
  const {user} = useAuth();

  const {button} = useStyles();

  const isLiked = user?._id && likes.includes(user._id);

  const onLike = () => {
    if (user?._id) {
      const action = isLiked ? unlikePost : likePost;

      action(postId).then(post => {
        onChange(post.likes);
      });
    }
  };

  return (
    <IconButton className={button} disabled={!Boolean(user)} onClick={onLike}>
      {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default LikeButton;
