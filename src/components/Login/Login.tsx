import React, {ChangeEvent, FC, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '5%',
    },
  })
);

interface LoginField {
  value: string;
  setValue: (newValue: string) => void;
  label: string;
}

const Login: FC = () => {
  const {login} = useAuth();
  const {root} = useStyles();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginFields: LoginField[] = [
    {label: 'Username', setValue: setUsername, value: username},
    {label: 'Password', setValue: setPassword, value: password},
  ];

  const loginUser = () => {
    login({username, password}).catch(err => {
      console.log(err);
    });
  };

  return (
    <Grid container className={root} direction="column" spacing={3}>
      {loginFields.map(({value, setValue, label}, index) => (
        <Grid item key={index}>
          <TextField
            value={value}
            onChange={({target}: ChangeEvent<HTMLInputElement>) =>
              setValue(target.value)
            }
            label={label}
            variant="outlined"
          />
        </Grid>
      ))}
      <Grid item>
        <Button variant="contained" color="primary" onClick={loginUser}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
