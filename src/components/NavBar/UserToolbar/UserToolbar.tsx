import React, {FC, useState, MouseEvent} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {User} from '../../../utils/users-api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBarText: {
      alignSelf: 'center',
    },
  })
);

interface UserToolbarProps {
  user: User | null;
  logout: () => Promise<void>;
}

const UserToolbar: FC<UserToolbarProps> = ({user, logout}) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState();
  const {navBarText} = useStyles();

  const closeUserMenu = () => setUserMenuAnchor(null);

  return user ? (
    <>
      <Grid container>
        <Grid item className={navBarText}>
          <Typography>{`Hello, ${user.username}`}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={({target}: MouseEvent<HTMLElement>) =>
              setUserMenuAnchor(target)
            }
            color="inherit">
            <AccountCircle />
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        keepMounted
        onClose={closeUserMenu}>
        <MenuItem component={RouterLink} to="/profile" onClick={closeUserMenu}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => logout().then(closeUserMenu)}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
      <Button color="inherit" component={RouterLink} to="/register">
        Register
      </Button>
    </>
  );
};

export default UserToolbar;
