import React, {FC, useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useParams} from 'react-router-dom';
import {getUserByUsername, User} from '../../utils/users-api';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profile: FC = () => {
  const {user: loggedInUser} = useAuth();
  const {username} = useParams();

  const isUserProfile = username === loggedInUser?.username;

  const [profile, setProfile] = useState<User | null | undefined>(
    isUserProfile ? loggedInUser : undefined
  );

  useEffect(() => {
    if (!isUserProfile && username) {
      getUserByUsername(username)
        .then(result => setProfile(result))
        .catch(() => setProfile(null));
    }
  }, []);

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
