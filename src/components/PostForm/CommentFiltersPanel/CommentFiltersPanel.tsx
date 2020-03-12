import Grid from '@material-ui/core/Grid';
import React, {FC} from 'react';
import {GetCommentsBody} from '../../../utils/comments-api';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export type CommentFilterData = Omit<GetCommentsBody, 'postId'>;

interface CommentFiltersPanelProps {
  filterData: CommentFilterData;
  onFilterChange: (newFilterData: CommentFilterData) => void;
}

const CommentFiltersPanel: FC<CommentFiltersPanelProps> = ({
  filterData,
  onFilterChange,
}) => {
  const {expanded} = useStyles();

  const setFilterChange = (
    filterName: keyof CommentFilterData,
    filterValue: string
  ) => {
    onFilterChange({...filterData, [filterName]: filterValue});
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <ExpansionPanel classes={{expanded}}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              label="Comment"
              value={filterData.commentFilter || ''}
              onChange={event =>
                setFilterChange('commentFilter', event.target.value)
              }
            />
          </Grid>
          <Grid item>
            <TextField
              label="Author"
              value={filterData.authorFilter || ''}
              onChange={event =>
                setFilterChange('authorFilter', event.target.value)
              }
            />
          </Grid>
          <Grid item>
            <TextField
              value={filterData.fromDateFilter || ''}
              label="From"
              type="date"
              onChange={event =>
                setFilterChange('fromDateFilter', event.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={filterData.toDateFilter || ''}
              label="To"
              type="date"
              onChange={event =>
                setFilterChange('toDateFilter', event.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={clearFilters}>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default CommentFiltersPanel;
