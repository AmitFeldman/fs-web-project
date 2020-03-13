import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserBar from './UserBar/UserBar';
import Logo from '../Logo/Logo';

const NavBar: FC = () => {
  const {user, logout, isUserAdmin} = useAuth();

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={2}>
              <Button component={RouterLink} color="inherit" to="/">
                <Logo />
              </Button>
            </Grid>
            <Grid
              container
              item
              justify="flex-end"
              xs={10}
              spacing={2}
              alignItems="center">
              {isUserAdmin() && (
                <>
                  <Grid item>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin/users"
                      variant="outlined">
                      Manage
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin/statistics"
                      variant="outlined">
                      Statistics
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item>
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
