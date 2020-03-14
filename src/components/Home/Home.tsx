import React, {FC, useEffect, useState} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {getPosts, getRecommendedPosts, Post} from '../../utils/posts-api';
import {useAuth} from '../../context/AuthContext';
import {onSocketEvent} from '../../utils/socket-client';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import NewsCard from '../NewsCard/NewsCard';
import {updateItem} from '../../utils/update-helper';
import {useAsync} from 'react-async';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textShadow: `1.5px 1.5px ${theme.palette.text.hint}`,
      paddingBottom: '5px',
    },
    container: {
      width: '80%',
      margin: 'auto',
    },
    tabButton: {
      margin: theme.spacing(1),
    },
  })
);

enum PostTabs {
  LATEST,
  RECOMMENDED,
}

const Home: FC = () => {
  const {user, isUserLoggedIn} = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);

  const [helpOpen, setHelpOpen] = useState(false);
  const [tab, setTab] = useState<PostTabs>(
    isUserLoggedIn() ? PostTabs.RECOMMENDED : PostTabs.LATEST
  );

  const {header, container, tabButton} = useStyles();

  // Get Posts
  useAsync(getPosts, {onResolve: result => setPosts(result)});

  // Get Recommended Posts each time user switches to recommended tab
  useEffect(() => {
    if (isUserLoggedIn() && tab === PostTabs.RECOMMENDED) {
      getRecommendedPosts().then(result => setRecommendedPosts(result));
    }
  }, [tab, isUserLoggedIn]);

  // Update the posts when there is a new one
  useEffect(() => {
    const cancelOnSocketEvent = onSocketEvent<Post>(
      'NEW_POST_EVENT',
      newPost => {
        // Check that user is not author of this new post
        if (newPost.author?._id !== user?._id)
          setNewPosts(newPosts => [newPost, ...newPosts]);
      }
    );

    return () => {
      cancelOnSocketEvent();
    };
  }, [user, newPosts, posts]);

  const showNewPosts = async () => {
    setPosts(oldPosts => [...newPosts, ...oldPosts]);
    setNewPosts([]);
  };

  // Triggers when posts are liked
  const postChange = (post: Post) => {
    if (tab === PostTabs.RECOMMENDED) {
      setRecommendedPosts(currPosts => updateItem<Post>(post, currPosts));
    }

    setPosts(currPosts => updateItem<Post>(post, currPosts));
  };

  return (
    <>
      <Grid
        className={container}
        container
        direction="column"
        spacing={2}
        justify="center"
        alignItems="stretch">
        <Grid item className="maxWidth">
          <CreatePost
            onCreatePost={newPost => {
              setPosts(currPosts => [newPost, ...currPosts]);
            }}
            onHelpClick={() => setHelpOpen(true)}
          />
        </Grid>

        <Grid item container alignItems="center">
          <Grid item container xs={10} spacing={2}>
            <Grid item>
              <Typography variant="h4" className={header}>
                Posts
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={tabButton}
                variant={tab === PostTabs.LATEST ? 'outlined' : 'text'}
                color="secondary"
                onClick={() => setTab(PostTabs.LATEST)}>
                Latest
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={tabButton}
                variant={tab === PostTabs.RECOMMENDED ? 'outlined' : 'text'}
                color="secondary"
                onClick={() => setTab(PostTabs.RECOMMENDED)}>
                Recommended
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {newPosts.length > 0 && tab === PostTabs.LATEST && (
              <Button
                variant="contained"
                color="secondary"
                onClick={showNewPosts}
                size="small">
                Show {newPosts.length} New Post{newPosts.length > 1 && 's'}
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>

        <Grid item className={container}>
          {tab === PostTabs.RECOMMENDED && !isUserLoggedIn() ? (
            <Typography variant="h4" align="center">
              Log in to see recommended posts!
            </Typography>
          ) : tab === PostTabs.RECOMMENDED && recommendedPosts.length === 0 ? (
            <Typography variant="h4" align="center">
              Like some posts so we can figure out what you like!
            </Typography>
          ) : (
            <PostList
              posts={tab === PostTabs.RECOMMENDED ? recommendedPosts : posts}
              onPostChange={postChange}
            />
          )}
        </Grid>
      </Grid>

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        style={{top: '10vh'}}
        className={container}>
        <section>
          <NewsCard />
        </section>
      </Modal>
    </>
  );
};

export default Home;
