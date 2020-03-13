import React, {FC} from 'react';
import {GetCommentsBody} from '../../../utils/comments-api';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PanelWrapper from '../../PanelWrapper/PanelWrapper';

export type CommentFilterData = Omit<GetCommentsBody, 'postId'>;

interface CommentFiltersPanelProps {
  filterData: CommentFilterData;
  onFilterChange: (newFilterData: CommentFilterData) => void;
}

const CommentFiltersPanel: FC<CommentFiltersPanelProps> = ({
  filterData,
  onFilterChange,
}) => {
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
    <PanelWrapper
      components={[
        <TextField
          label="Comment"
          value={filterData.commentFilter || ''}
          onChange={event =>
            setFilterChange('commentFilter', event.target.value)
          }
        />,
        <TextField
          label="Author"
          value={filterData.authorFilter || ''}
          onChange={event =>
            setFilterChange('authorFilter', event.target.value)
          }
        />,
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
        />,
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
        />,
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={clearFilters}>
          Clear Filters
        </Button>,
      ]}
    />
  );
};

export default CommentFiltersPanel;
