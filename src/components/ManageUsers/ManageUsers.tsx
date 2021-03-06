import React, {FC, useEffect, useState, useRef} from 'react';
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
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {formatDate} from '../../utils/date-helper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {deleteItem, updateItem} from '../../utils/update-helper';

const ManageUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<UserFilterData>({});

  useEffect(() => {
    getUsers({...filterData}).then(result => {
      setUsers(result);
    });
  }, [filterData]);

  const updateLocalUser = (updatedUser: User) => {
    setUsers(currentUsers => updateItem<User>(updatedUser, currentUsers));
  };

  const removeLocalUser = (userId: string) => {
    setUsers(currentUsers => deleteItem<User>(userId, currentUsers));
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
              onUserUpdate={updateLocalUser}
              onUserDelete={removeLocalUser}
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
  const [isValid, setIsValid] = useState<boolean>(true);
  const form = useRef<ValidatorForm>(null);

  useEffect(() => {
    form?.current?.isFormValid(false).then(validity => setIsValid(validity));
  }, [localUser]);

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

  const localUserChanged = (): boolean =>
    localUser.username !== user.username ||
    localUser.email !== user.email ||
    localUser.isAdmin !== user.isAdmin;

  return (
    <Paper>
      <ValidatorForm ref={form} onSubmit={submitUpdate}>
        <Grid container spacing={2} justify="space-around" alignItems="center">
          <Grid item>
            <TextValidator
              name="username"
              label="Username"
              value={localUser.username}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                updateLocalUser(event.currentTarget.value, 'username');
              }}
              validators={['minStringLength:1']}
              errorMessages={["Username can't be empty"]}
            />
          </Grid>
          <Grid item>
            <TextValidator
              name="email"
              label="Email"
              value={localUser.email}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                updateLocalUser(event.currentTarget.value, 'email');
              }}
              validators={['minStringLength:1', 'isEmail']}
              errorMessages={["Email can't be empty", 'Email is not valid']}
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
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!(localUserChanged() && isValid)}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={submitDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Paper>
  );
};

export default ManageUsers;
