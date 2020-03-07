import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import UserBar from './UserBar/UserBar';
import Logo from '../Logo/Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBarText: {
      alignSelf: 'center',
    },
  })
);

const NavBar: FC = () => {
  const {user, logout} = useAuth();
  const {navBarText} = useStyles();

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item className={navBarText} xs={2}>
              <Button component={RouterLink} color="inherit" to="/">
                <Logo />
              </Button>
            </Grid>
            <Grid container item justify="flex-end" xs={10} spacing={2}>
              <Grid item className={navBarText}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/about"
                  variant="outlined">
                  About Us
                </Button>
              </Grid>
              <UserBar user={user} logout={logout} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavBar;
