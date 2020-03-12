import React, {FC} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  button?: JSX.Element;
  setState: (newState: any) => void;
}

const AlertSnackbar: FC<AlertSnackbarProps> = ({
  open,
  message,
  button,
  setState,
}) => {
  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState('');
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          {button}
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default AlertSnackbar;
