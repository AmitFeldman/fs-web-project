import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import {Post} from '../../../utils/posts-api';
import {Link, useHistory} from 'react-router-dom';
import UserLink from '../../UserLink/UserLink';

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({post}) => {
  const {_id, title, body, comments, author} = post;
  const history = useHistory();

  const redirectToPost = () => {
    history.push(`/post/${_id}`);
  };

  return (
    <Paper onClick={redirectToPost}>
      <div>{title}</div>
      <div>{body}</div>
      <UserLink user={author} />
      <div>{comments.length} Comments</div>
    </Paper>
  );
};

export default PostCard;
