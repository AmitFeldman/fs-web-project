import React, {FC, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link as RouterLink} from 'react-router-dom';
import {UserErrorCode} from '../../utils/users-api';
import AlertSnackbar from '../../components/AlertSnackbar/AlertSnackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '5%',
    },
  })
);

const Login: FC = () => {
  const {login} = useAuth();
  const {root} = useStyles();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loginUser = () => {
    login({username, password}).catch(err => {
      if (err.code === UserErrorCode.USER_NOT_FOUND) setError(err.msg);
    });
  };

  // const handleCloseError = (event?: any, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setError('');
  // };

  return (
    <>
      <ValidatorForm onSubmit={loginUser}>
        <Grid container className={root} direction="column" spacing={3}>
          <h1>Login</h1>
          <Grid item>
            <TextValidator
              name="Username"
              value={username}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setUsername(e.currentTarget.value);
              }}
              label="Username"
              variant="outlined"
              validators={['required']}
              errorMessages={['Username is required']}
            />
          </Grid>
          <Grid item>
            <TextValidator
              name="Password"
              type="password"
              value={password}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setPassword(e.currentTarget.value);
              }}
              label="Password"
              variant="outlined"
              validators={['required']}
              errorMessages={['Password is required']}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      <AlertSnackbar
        open={error !== ''}
        message={error}
        button={
          <Button
            color="primary"
            size="small"
            component={RouterLink}
            to="/register">
            Register
          </Button>
        }
        setState={setError}
      />
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error !== ''}
        autoHideDuration={5000}
        onClose={handleCloseError}
        message={error}
        action={
          <React.Fragment>
            <Button
              color="primary"
              size="small"
              component={RouterLink}
              to="/register">
              Register
            </Button>
            <IconButton size="small" color="inherit" onClick={handleCloseError}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
    </>
  );
};

export default Login;
