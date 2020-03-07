import React, {FC, useEffect, useState} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {BasicPost, getPosts, getPostsByIds, Post} from '../../utils/posts-api';
import {useAuth} from '../../context/AuthContext';
import {useAsync} from 'react-async';
import {onSocketEvent} from '../../utils/socket-client';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import NewsCard from '../NewsCard/NewsCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textShadow: `1.5px 1.5px ${theme.palette.text.hint}`,
    },
    container: {
      width: '80%',
    },
    newPostsButton: {
      float: 'right',
    },
    modal: {
      width: '80%',
      margin: 'auto',
    },
  })
);

const includesPost = (
  post: BasicPost,
  posts: (BasicPost | Post)[]
): boolean => {
  return posts.some(p => p._id === post._id);
};

const Home: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<BasicPost[]>([]);
  const {user} = useAuth();
  const [helpOpen, setHelpOpen] = useState(false);

  const {header, container, newPostsButton, modal} = useStyles();

  useAsync(getPosts, {onResolve: result => setPosts(result)});

  useEffect(() => {
    const cancelOnSocketEvent = onSocketEvent<BasicPost>(
      'POST_CHANGE',
      changedPost => {
        // Check that user is not author and that it is a new post
        if (
          changedPost.author !== user?._id &&
          !includesPost(changedPost, newPosts) &&
          !includesPost(changedPost, posts)
        )
          setNewPosts(newPosts => [changedPost, ...newPosts]);
      }
    );

    return () => {
      cancelOnSocketEvent();
    };
  }, [user, newPosts, posts]);

  const showNewPosts = async () => {
    const result = await getPostsByIds(...newPosts.map(({_id}) => _id));

    setPosts(oldPosts => [...result, ...oldPosts]);
    setNewPosts([]);
  };

  return (
    <>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item xs={12} className={container}>
          <CreatePost
            onCreatePost={newPost => {
              setPosts(currPosts => [newPost, ...currPosts]);
            }}
            onHelpClick={() => setHelpOpen(true)}
          />
        </Grid>
        <Grid item xs={12} className={container}>
          <Typography variant="h4" className={header}>
            Latest Posts{' '}
            {newPosts.length > 0 && (
              <Button
                className={newPostsButton}
                variant="contained"
                color="secondary"
                onClick={showNewPosts}
                size="small">
                Show {newPosts.length} New Post{newPosts.length > 1 && 's'}
              </Button>
            )}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <PostList posts={posts} />
        </Grid>
      </Grid>

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        style={{top: '10vh'}}
        className={modal}>
        <section>
          <NewsCard />
        </section>
      </Modal>
    </>
  );
};

export default Home;
