import React, {FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import {KeyboardArrowUp} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface ScrollTopProps {
  anchorId: string;
}

const ScrollTop: FC<ScrollTopProps> = ({anchorId, children}) => {
  const {root} = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(`#${anchorId}`);

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={trigger}>
      <aside onClick={handleClick} role="presentation" className={root}>
        <Fab color="secondary" size="small">
          <KeyboardArrowUp />
        </Fab>
      </aside>
    </Zoom>
  );
};

export default ScrollTop;
