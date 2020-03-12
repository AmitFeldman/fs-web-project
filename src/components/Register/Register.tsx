import React, {FC, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AlertSnackbar from '../../components/AlertSnackbar/AlertSnackbar';
import {UserErrorCode} from '../../utils/users-api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '5%',
    },
  })
);

const Login: FC = () => {
  const {register} = useAuth();
  const {root} = useStyles();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = () => {
    register({username, email, password}).catch(err => {
      if (
        err.code === UserErrorCode.EMAIL_EXIST ||
        err.code === UserErrorCode.USERNAME_EXIST
      )
        setError(err.msg);
    });
  };

  return (
    <>
      <ValidatorForm onSubmit={handleRegister}>
        <Grid container className={root} direction="column" spacing={3}>
          <h1>Register</h1>
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
              name="Email"
              value={email}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setEmail(e.currentTarget.value);
              }}
              label="Email"
              variant="outlined"
              validators={['required', 'isEmail']}
              errorMessages={['Email is required', 'Email is not valid']}
            />
          </Grid>
          <Grid item>
            <TextValidator
              name="Password"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      <AlertSnackbar message={error} setMessage={setError} />
    </>
  );
};

export default Login;
