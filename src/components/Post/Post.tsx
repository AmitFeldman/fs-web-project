import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getPostById, PostWithComments} from '../../utils/posts-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import UserLink from '../UserLink/UserLink';
import Comment from './Comment/Comment';
import CreateComment from './CreateComment/CreateComment';

const Post: FC = () => {
  const [post, setPost] = useState<PostWithComments | null>();
  let {postId} = useParams();

  useEffect(() => {
    if (postId) {
      getPostById(postId)
        .then(result => setPost(result))
        .catch(err => setPost(null));
    }
  }, []);

  if (postId === undefined || post === null) {
    return <h1>Not a valid id</h1>;
  }

  if (post === undefined) {
    return <CircularProgress />;
  }

  const {author, body, comments, title} = post;

  return (
    <>
      <h1>{title}</h1>
      <UserLink user={author} />
      <h3>{body}</h3>
      <Divider />
      <CreateComment postId={postId} />
      <br />
      <section>
        {comments.map(comment => (
          <Comment key={comment._id} commentItem={comment} />
        ))}
      </section>
    </>
  );
};

export default Post;
