import Typography from '@material-ui/core/Typography';
import {formatDate} from '../../utils/date-helper';
import UserLink from '../UserLink/UserLink';
import React, {FC} from 'react';
import {User} from '../../utils/users-api';

interface CardFooterProps {
  date: string;
  user: User;
}

const DataFooter: FC<CardFooterProps> = ({date, user}) => {
  return (
    <Typography variant="caption">
      Submitted {formatDate(date)} by{' '}
      <UserLink user={user}>
        <Typography variant="caption">{user.username}</Typography>
      </UserLink>
    </Typography>
  );
};

export default DataFooter;