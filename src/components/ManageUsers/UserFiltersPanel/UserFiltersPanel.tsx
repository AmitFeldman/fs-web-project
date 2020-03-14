import React, {FC} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {GetUsersBody} from '../../../utils/users-api';
import PanelWrapper from '../../PanelWrapper/PanelWrapper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export type UserFilterData = GetUsersBody;

export enum USER_TYPES {
  ADMIN,
  USER,
  NONE,
}

interface UserFiltersPanelProps {
  filterData: UserFilterData;
  onFilterChange: (newFilterData: UserFilterData) => void;
}

const UserFiltersPanel: FC<UserFiltersPanelProps> = ({
  filterData,
  onFilterChange,
}) => {
  const setFilterChange = (
    filterName: keyof UserFilterData,
    filterValue: string | boolean
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
          label="Username"
          value={filterData.usernameFilter || ''}
          onChange={event =>
            setFilterChange('usernameFilter', event.target.value)
          }
        />,
        <TextField
          label="Email"
          value={filterData.emailFilter || ''}
          onChange={event => setFilterChange('emailFilter', event.target.value)}
        />,
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={
              filterData.isAdminFilter === undefined
                ? USER_TYPES.NONE
                : filterData.isAdminFilter
                ? USER_TYPES.ADMIN
                : USER_TYPES.USER
            }
            onChange={event => {
              const value = event.target.value;

              if (value === USER_TYPES.ADMIN)
                setFilterChange('isAdminFilter', true);
              else if (value === USER_TYPES.USER)
                setFilterChange('isAdminFilter', false);
              else {
                const filter: UserFilterData = {...filterData};
                delete filter.isAdminFilter;
                onFilterChange({...filter});
              }
            }}>
            <MenuItem value={USER_TYPES.ADMIN}>Admin</MenuItem>
            <MenuItem value={USER_TYPES.USER}>User</MenuItem>
            <MenuItem value={USER_TYPES.NONE}>None</MenuItem>
          </Select>
        </FormControl>,
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

export default UserFiltersPanel;
