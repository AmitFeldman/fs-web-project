import Grid from '@material-ui/core/Grid';
import React, {FC} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expanded: {
      '&$expanded': {
        margin: '0 auto',
      },
    },
  })
);

interface PanelWrapperProps {
  components: JSX.Element[];
}

const PanelWrapper: FC<PanelWrapperProps> = ({components}) => {
  const {expanded} = useStyles();

  return (
    <ExpansionPanel classes={{expanded}}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {components.map((component, index) => (
            <Grid item key={index}>
              {component}
            </Grid>
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default PanelWrapper;
