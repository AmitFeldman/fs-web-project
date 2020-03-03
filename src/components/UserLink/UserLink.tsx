import React, {FC} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {User} from '../../utils/users-api';

interface UserLinkProps {
  username: User['username'];
}

const UserLink: FC<UserLinkProps> = ({username}) => {
  return (
    <Link onClick={e => e.stopPropagation()} to={`/user/${username}`}>
      By {username}
    </Link>
  );
};

export default UserLink;
