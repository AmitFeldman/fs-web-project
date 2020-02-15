import React, {FC} from 'react';
import {useAuth} from '../../context/AuthContext';

const Profile: FC = () => {
  const {user} = useAuth();

  return (
    <div>
      <div>{`Username: ${user?.username}`}</div>
      <div>{`Email: ${user?.email}`}</div>
      <div>{`Admin: ${user?.isAdmin}`}</div>
    </div>
  );
};

export default Profile;
