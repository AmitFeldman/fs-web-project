import React, {FC, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

  const loginUser = () => {
    login({username, password}).catch(err => {
      console.log(err);
    });
  };

  return (
    <ValidatorForm onSubmit={loginUser}>
      <Grid container className={root} direction="column" spacing={3}>
        <Grid item key="Username">
          <TextValidator
            name="Username"
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
            label="Username"
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
          />
        </Grid>
        <Grid item key="Password">
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
            errorMessages={['This field is required']}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Login;
