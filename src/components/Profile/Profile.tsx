import React, {FC, useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useParams, Redirect} from 'react-router-dom';
import {getUserByUsername, User} from '../../utils/users-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useUserLocation} from '../UserLink/UserLink';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {getPostsByUserId, Post} from '../../utils/posts-api';
import PostList from '../Home/PostList/PostList';
import Box from '@material-ui/core/Box';

const Profile: FC = () => {
  const {username} = useParams();
  const {user: loggedInUser} = useAuth();
  // If UserLink component redirected user to this route
  const locationUser = useUserLocation();

  const isUserProfile = username === loggedInUser?.username;

  const getProfile = () => {
    // If requested username is the logged in user
    if (isUserProfile) return loggedInUser;

    if (locationUser) return locationUser;

    return undefined;
  };

  const [profile, setProfile] = useState<User | null | undefined>(getProfile());
  const [postHistory, setPostHistory] = useState<Post[]>([]);

  useEffect(() => {
    if (!profile && profile !== null && username) {
      getUserByUsername(username)
        .then(result => setProfile(result))
        .catch(() => setProfile(null));
    }
  }, [username, profile]);

  useEffect(() => {
    const userId = profile?._id;

    if (userId) {
      getPostsByUserId(userId).then(result => setPostHistory(result));
    }
  }, [profile]);

  if (profile === null) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: {error: 'This user does not exist!'},
        }}
      />
    );
  }

  if (profile === undefined) {
    return <CircularProgress />;
  }

  const {email, isAdmin} = profile;

  return (
    <>
      <Typography variant="h3">User Information</Typography>
      <Divider />
      <br />

      {isAdmin && (
        <>
          <Typography color="error" variant="h6">
            This user is an administrator.
          </Typography>
          <br />
        </>
      )}

      <Typography variant="h6">
        Username:{' '}
        <Typography variant="inherit" color="secondary">
          {username}
        </Typography>
      </Typography>

      <Typography variant="h6">
        Email:{' '}
        <Typography variant="inherit" color="secondary">
          {email}
        </Typography>
      </Typography>
      <br />

      <Divider />
      <br />

      <Typography variant="h4">Post History</Typography>

      <br />
      <Divider />
      <br />

      <Box width="80%" margin="auto">
        <PostList posts={postHistory} />
      </Box>

      <br />
    </>
  );
};

export default Profile;
