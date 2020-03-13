import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {FC} from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      float: 'right',
    },
    icon: {
      borderRadius: '35px',
      width: '35px',
      height: '35px',
    },
  })
);

interface ShareButtonProps {
  button: any;
  icon: any;
}

const ShareButton: FC<ShareButtonProps> = ({button: Button, icon: Icon}) => {
  const {button, icon} = useStyles();

  return (
    <Button
      style={{padding: 4}}
      className={button}
      title="Check out this post! "
      url={window.location.href}>
      <Icon className={icon} />
    </Button>
  );
};

export default ShareButton;
