import React, {FC} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';

interface ErrorProps {
  message?: string;
}

const Error: FC<ErrorProps> = ({message = 'You seem to have gotten lost!'}) => {
  return (
    <>
      <Typography variant="h5" color="error">
        {message}
      </Typography>
      <Button component={RouterLink} color="primary" to="/">
        Go back home
      </Button>
    </>
  );
};

export default Error;
