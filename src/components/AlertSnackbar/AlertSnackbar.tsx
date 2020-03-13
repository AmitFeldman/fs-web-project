import React, {FC, useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';
import {AlertData} from '../../context/AlertContext';

interface AlertSnackbarProps {
  alertData: AlertData;
}

const AlertSnackbar: FC<AlertSnackbarProps> = ({alertData}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, [alertData]);

  const handleClose = (event: any, reason?: string) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
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
      message={alertData.message}
      action={
        <>
          {alertData.redirectPath && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              component={RouterLink}
              to={alertData.redirectPath}>
              {alertData.buttonText || ''}
            </Button>
          )}
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default AlertSnackbar;
