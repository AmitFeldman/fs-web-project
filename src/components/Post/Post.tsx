import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getPostById, PostWithComments} from '../../utils/posts-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CreateComment from './CreateComment/CreateComment';
import DataFooter from '../DataFooter/DataFooter';
import CommentList from './CommentList/CommentList';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      float: 'right',
    },
    icon: {
      borderRadius: '35px',
      width: '35px',
      height: '35px',
    },
  })
);

interface ShareButtonProps {
  button: any;
  icon: any;
}

const ShareButton: FC<ShareButtonProps> = ({button: Button, icon: Icon}) => {
  const {button, icon} = useStyles();

  return (
    <Button
      style={{padding: 4}}
      className={button}
      title="Check out this post! "
      url={window.location.href}>
      <Icon className={icon} />
    </Button>
  );
};

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
      <Typography noWrap variant="h2">
        {title}
      </Typography>
      <DataFooter user={author} date={date} />
      <Divider />

      <Typography paragraph variant="body1">
        {body}
      </Typography>
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
        <Typography variant="h6">
          {comments.length} Comments
          <ShareButton button={WhatsappShareButton} icon={WhatsappIcon} />
          <ShareButton button={FacebookShareButton} icon={FacebookIcon} />
          <ShareButton button={TwitterShareButton} icon={TwitterIcon} />
        </Typography>
        <Divider />
        <br />

        <CommentList comments={comments} />
      </section>
    </>
  );
};

export default Post;
