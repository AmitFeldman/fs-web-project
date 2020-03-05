import React, {FC, useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useParams, Redirect} from 'react-router-dom';
import {getUserByUsername, User} from '../../utils/users-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useUserLocation} from '../UserLink/UserLink';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

  useEffect(() => {
    if (!profile && profile !== null && username) {
      getUserByUsername(username)
        .then(result => setProfile(result))
        .catch(() => setProfile(null));
    }
  }, [username, profile]);

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
    <div>
      <Typography variant="h4">User Information</Typography>
      <Divider />
      <br />

      <Typography variant="body1">Username: {username}</Typography>
      <Typography variant="body1">Email: {email}</Typography>
      {isAdmin && (
        <Typography variant="body1">This user is an admin.</Typography>
      )}

      <br />
      <Typography variant="h4">User Activity</Typography>
      <Divider />

      <Typography> ADD USER ACTIVITY</Typography>
    </div>
  );
};

export default Profile;
