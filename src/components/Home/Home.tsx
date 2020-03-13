import React, {FC, useEffect, useState} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {getPosts, getRecommendedPosts, Post} from '../../utils/posts-api';
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
      paddingBottom: '5px',
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

const includesPost = (post: Post, posts: Post[]): boolean => {
  return posts.some(p => p._id === post._id);
};

const Home: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const {user, isUserLoggedIn} = useAuth();
  const [helpOpen, setHelpOpen] = useState(false);
  const [isLatestSelected, setIsLatestSelected] = useState(!isUserLoggedIn());
  const [isRecommendedSelected, setIsRecommendedSelected] = useState(
    isUserLoggedIn()
  );

  const {header, container, newPostsButton, modal} = useStyles();

  // let getPostsFunction = isUserLoggedIn() ? getRecommendedPosts : getPosts;
  // let setPostsFunction = isUserLoggedIn() ? setRecommendedPosts : setPosts;

  useAsync(isUserLoggedIn() ? getRecommendedPosts : getPosts, {
    onResolve: result =>
      isUserLoggedIn() ? setRecommendedPosts(result) : setPosts(result),
  });

  useEffect(() => {
    const cancelOnSocketEvent = onSocketEvent<Post>(
      'POST_CHANGE',
      changedPost => {
        // Check that user is not author and that it is a new post
        if (
          changedPost.author?._id !== user?._id &&
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
    setPosts(oldPosts => [...newPosts, ...oldPosts]);
    setNewPosts([]);
  };

  const latestClicked = () => {
    setIsLatestSelected(true);
    setIsRecommendedSelected(false);

    getPosts()
      .then(posts => {
        setPosts(posts);
        setNewPosts([]);
      })
      .catch(err => setPosts([]));
  };

  const recommendedClicked = () => {
    setIsRecommendedSelected(true);
    setIsLatestSelected(false);

    getRecommendedPosts()
      .then(recommendedPosts => setRecommendedPosts(recommendedPosts))
      .catch(err => setRecommendedPosts([]));
  };

  // const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setValue(newValue);
  // };

  // useEffect(() => {
  //   if (value === RECOMMENDED_TAB && isUserLoggedIn()) {
  //     getPostsFunction = getRecommendedPosts;
  //     setPostsFunction = setRecommendedPosts;
  //   } else {
  //     getPostsFunction = getPosts;
  //     setPostsFunction = setPosts;
  //   }
  //
  //   getPostsFunction()
  //     .then(posts => setPostsFunction(posts))
  //     .catch(err => setPostsFunction([]));
  // }, [value]);

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
            Posts
          </Typography>
          <Grid container spacing={2}>
            {isUserLoggedIn() && (
              <Grid item>
                <Button
                  variant={isRecommendedSelected ? 'outlined' : 'text'}
                  color="secondary"
                  onClick={recommendedClicked}>
                  Recommended
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                variant={isLatestSelected ? 'outlined' : 'text'}
                color="secondary"
                onClick={latestClicked}>
                Latest
              </Button>
            </Grid>
          </Grid>
          {newPosts.length > 0 && !isRecommendedSelected && (
            <Button
              className={newPostsButton}
              variant="contained"
              color="secondary"
              onClick={showNewPosts}
              size="small">
              Show {newPosts.length} New Post{newPosts.length > 1 && 's'}
            </Button>
          )}
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <PostList posts={isRecommendedSelected ? recommendedPosts : posts} />
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
