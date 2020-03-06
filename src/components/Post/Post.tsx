import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getPostById, PostWithComments} from '../../utils/posts-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Comment from './Comment/Comment';
import CreateComment from './CreateComment/CreateComment';
import {sortByDescendingDate} from '../../utils/date-helper';
import DataFooter from '../DataFooter/DataFooter';

const Post: FC = () => {
  const [post, setPost] = useState<PostWithComments | null>();
  let {postId} = useParams();

  useEffect(() => {
    if (postId) {
      getPostById(postId)
        .then(result => setPost(result))
        .catch(err => setPost(null));
    }
  }, [postId]);

  if (postId === undefined || post === null) {
    return <h1>Not a valid id</h1>;
  }

  if (post === undefined) {
    return <CircularProgress />;
  }

  const {author, body, comments, title, date} = post;

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <DataFooter user={author} date={date} />
      <Divider />

      <Typography variant="body1">{body}</Typography>
      <Divider />
      <br />

      <CreateComment
        postId={postId}
        onCreateComment={newComment => {
          // @ts-ignore
          setPost(currPost => {
            const comments = currPost?.comments || [];

            return {
              ...currPost,
              comments: [newComment, ...comments],
            };
          });
        }}
      />
      <br />

      <section>
        <Typography variant="h6">{comments.length} Comments</Typography>
        <Divider />
        <br />

        <Grid container direction="column" spacing={2}>
          {comments.sort(sortByDescendingDate).map(comment => (
            <Grid item key={comment._id}>
              <Comment commentItem={comment} />
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
};

export default Post;
