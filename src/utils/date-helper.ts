import moment from 'moment';
import {BasicType} from '../types/basic-type';

const getTimestamp = (date: string): number => Number(moment(date).format('X'));

const sortByDescendingDate = (
  {date: dateA}: BasicType,
  {date: dateB}: BasicType
): number => {
  return getTimestamp(dateB) - getTimestamp(dateA);
};

const formatDate = (date: string) =>
  moment(date).format('MM/DD/YYYY, hh:mm:ss');

export {sortByDescendingDate, formatDate};
