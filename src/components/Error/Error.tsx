import React, {FC} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import Box from '@material-ui/core/Box';

const DEFAULT_ERROR_MESSAGE =
  "We can't seem to find the page you are looking for!";

interface ErrorLocationState {
  error: string;
}

const Error: FC = () => {
  const {state} = useLocation<ErrorLocationState | undefined>();

  const message = state?.error || DEFAULT_ERROR_MESSAGE;

  return (
    <Box marginY="10%">
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h3" color="error">
        {message}
      </Typography>
      <br />
      <Button
        size="large"
        variant="contained"
        component={RouterLink}
        color="secondary"
        to="/">
        Go back home
      </Button>
    </Box>
  );
};

export default Error;
