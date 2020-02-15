import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import UserToolbar from './UserToolbar/UserToolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    navBarText: {
      alignSelf: 'center',
    },
  })
);

const NavBar: FC = () => {
  const {user, logout} = useAuth();
  const {menuButton, navBarText} = useStyles();

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item container xs={6}>
              <Grid item>
                <IconButton edge="start" className={menuButton} color="inherit">
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item className={navBarText}>
                <Button component={RouterLink} color="inherit" to="/">
                  Home
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <UserToolbar user={user} logout={logout} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavBar;
