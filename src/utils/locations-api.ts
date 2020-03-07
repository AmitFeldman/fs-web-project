import client from './api-client';
import {BasicType} from '../types/basic-type';

export interface LocationData extends BasicType {
  longitude: number;
  latitude: number;
}

const getLocations = async (): Promise<LocationData[]> => {
  return await client<{}, LocationData[]>('locations');
};

export {getLocations};
