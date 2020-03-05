import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {User} from '../../utils/users-api';

interface UserLocationState {
  user: User;
}

export const useUserLocation = () => {
  const {state} = useLocation<UserLocationState | undefined>();

  return state?.user;
};

interface UserLinkProps {
  user: User;
}

const UserLink: FC<UserLinkProps> = ({user, children}) => {
  const {username} = user;

  return (
    <Link
      onClick={e => e.stopPropagation()}
      to={{pathname: `/user/${username}`, state: {user}}}>
      {children}
    </Link>
  );
};

export default UserLink;
