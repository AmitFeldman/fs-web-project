import React, {FC, useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useParams, useLocation} from 'react-router-dom';
import {getUserByUsername, User} from '../../utils/users-api';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profile: FC = () => {
  const {username} = useParams();
  const {user: loggedInUser} = useAuth();
  const {state} = useLocation<{user: User}>();

  const isUserProfile = username === loggedInUser?.username;

  const getProfile = () => {
    // Check that requested username is valid string
    if (typeof username !== 'string' || username === '') return null;

    // If requested username is the logged in user
    if (isUserProfile) return loggedInUser;

    // If requested username is sent by redirect in location state
    if (username === state?.user?.username) return state.user;

    return undefined;
  };

  const [profile, setProfile] = useState<User | null | undefined>(getProfile());

  useEffect(() => {
    if (!profile && username) {
      getUserByUsername(username)
        .then(result => setProfile(result))
        .catch(() => setProfile(null));
    }
  }, [username, profile]);

  if (profile === null) {
    return <h1>Not a valid username</h1>;
  }

  if (profile === undefined) {
    return <CircularProgress />;
  }

  const {email, isAdmin} = profile;

  return (
    <div>
      {isUserProfile && <h1>This is me!</h1>}
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      {isAdmin && <div>This user is an admin.</div>}
    </div>
  );
};

export default Profile;
