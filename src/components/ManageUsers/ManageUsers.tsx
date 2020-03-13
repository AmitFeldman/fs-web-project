import React, {FC, useEffect, useState} from 'react';
import {
  deleteUser,
  getUsers,
  updateUser,
  UpdateUserBody,
  User,
} from '../../utils/users-api';
import UserFiltersPanel, {
  USER_TYPES,
  UserFilterData,
} from './UserFiltersPanel/UserFiltersPanel';
import {FormControl, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {formatDate} from '../../utils/date-helper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ManageUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<UserFilterData>({});

  useEffect(() => {
    getUsers({...filterData}).then(result => {
      setUsers(result);
    });
  }, [filterData]);

  const updateUsers = (updatedUser: User) => {
    setUsers(currentUsers => {
      const index = currentUsers.findIndex(({_id}) => _id === updatedUser._id);

      return [
        ...currentUsers.slice(0, index),
        updatedUser,
        ...currentUsers.slice(index + 1, currentUsers.length),
      ];
    });
  };

  const removeUser = (userId: string) => {
    setUsers(currentUsers => {
      const index = currentUsers.findIndex(({_id}) => _id === userId);

      return [...currentUsers.splice(index, 1)];
    });
  };

  return (
    <>
      <Typography variant="h3">Manage Users</Typography>
      <Divider />
      <br />

      <UserFiltersPanel
        filterData={filterData}
        onFilterChange={setFilterData}
      />

      <br />
      <Divider />
      <br />

      <Grid container direction="column" spacing={4}>
        {users.map(user => (
          <Grid item key={user._id} xs={12}>
            <UserRow
              user={user}
              onUserUpdate={updateUsers}
              onUserDelete={removeUser}
            />
          </Grid>
        ))}
      </Grid>

      <br />
    </>
  );
};

interface UserRowProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void;
  onUserDelete: (userId: string) => void;
}

const UserRow: FC<UserRowProps> = ({user, onUserUpdate, onUserDelete}) => {
  const [localUser, setLocalUser] = useState<User>(user);

  const submitUpdate = () => {
    const {username, email, isAdmin} = localUser;

    const body: UpdateUserBody = {userId: user._id, username, email, isAdmin};

    updateUser(body).then(onUserUpdate);
  };

  const submitDelete = () => {
    const {_id: userId} = localUser;

    deleteUser({userId}).then(() => onUserDelete(userId));
  };

  const updateLocalUser = (value: string | boolean, propertyName: string) => {
    setLocalUser(data => ({...data, [propertyName]: value}));
  };

  const localUserChanged = (): boolean => {
    if (localUser.username !== user.username) return true;
    if (localUser.email !== user.email) return true;
    return localUser.isAdmin !== user.isAdmin;
  };

  return (
    <Paper>
      <Grid container spacing={2} justify="space-around" alignItems="center">
        <Grid item>
          <TextField
            label="Username"
            value={localUser.username}
            onChange={event => updateLocalUser(event.target.value, 'username')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            value={localUser.email}
            onChange={event => updateLocalUser(event.target.value, 'email')}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              value={localUser.isAdmin ? USER_TYPES.ADMIN : USER_TYPES.USER}
              onChange={event => {
                const isAdmin = event.target.value === USER_TYPES.ADMIN;
                updateLocalUser(isAdmin, 'isAdmin');
              }}>
              <MenuItem value={USER_TYPES.ADMIN}>Admin</MenuItem>
              <MenuItem value={USER_TYPES.USER}>User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            Created
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formatDate(user.date)}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            disabled={!localUserChanged()}
            onClick={submitUpdate}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={submitDelete}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ManageUsers;
