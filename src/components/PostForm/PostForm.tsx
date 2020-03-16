import React, {FC, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {getPostById, Post} from '../../utils/posts-api';
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
import ShareButton from './ShareButton/ShareButton';
import {CommentItem, getComments} from '../../utils/comments-api';
import CommentFiltersPanel, {
  CommentFilterData,
} from './CommentFiltersPanel/CommentFiltersPanel';
import LikeWrapper from '../LikeWrapper/LikeWrapper';

const PostForm: FC = () => {
  let {postId = ''} = useParams();

  const [post, setPost] = useState<Post | null>();
  const [comments, setCommments] = useState<CommentItem[]>();
  const [filterData, setFilterData] = useState<CommentFilterData>({});

  useEffect(() => {
    if (postId) {
      getPostById(postId)
        .then(result => setPost(result))
        .catch(err => setPost(null));
    }
  }, [postId]);

  useEffect(() => {
    getComments({postId, ...filterData}).then(result => {
      setCommments(result);
    });
  }, [postId, filterData]);

  if (post === null) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: {error: 'This post does not exist!'},
        }}
      />
    );
  }

  return (
    <>
      {post ? (
        <LikeWrapper post={post} onChange={setPost}>
          <Typography noWrap variant="h2">
            {post.title}
          </Typography>
          <DataFooter user={post.author} date={post.date} />
          <Divider />

          <Typography variant="body1" style={{wordWrap: 'break-word'}}>
            {post.body}
          </Typography>
          <Divider />
          <br />
        </LikeWrapper>
      ) : (
        <CircularProgress />
      )}

      <CreateComment
        postId={postId}
        onCreateComment={newComment => {
          setCommments(currComments => [
            newComment,
            ...(currComments ? currComments : []),
          ]);
        }}
      />
      <br />

      <section>
        <Typography variant="h6">
          {comments?.length} Comments
          <ShareButton button={WhatsappShareButton} icon={WhatsappIcon} />
          <ShareButton button={FacebookShareButton} icon={FacebookIcon} />
          <ShareButton button={TwitterShareButton} icon={TwitterIcon} />
        </Typography>
        <Divider />
        <br />

        <CommentFiltersPanel
          filterData={filterData}
          onFilterChange={setFilterData}
        />

        <br />
        <Divider />
        <br />

        <CommentList comments={comments} />
      </section>
    </>
  );
};

export default PostForm;
