import React, {FC} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {User} from '../../utils/users-api';

interface UserLinkProps {
  user: User;
}

const UserLink: FC<UserLinkProps> = ({user}) => {
  const {username} = user;

  return (
    <Link
      onClick={e => e.stopPropagation()}
      to={{pathname: `/user/${username}`, state: {user}}}>
      By {username}
    </Link>
  );
};

export default UserLink;
