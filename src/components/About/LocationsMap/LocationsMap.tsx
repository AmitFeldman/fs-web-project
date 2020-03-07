import React, {ComponentClass, FC} from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
import withGoogleMap, {
  WithGoogleMapProps,
} from 'react-google-maps/lib/withGoogleMap';
import withScriptjs, {
  WithScriptjsProps,
} from 'react-google-maps/lib/withScriptjs';
import {getLocations, LocationData} from '../../../utils/locations-api';
import {useAsync} from 'react-async';
import {google} from '../../../config/config';

// Tel Aviv Coordinates
const CENTER = {lat: 32.0853, lng: 34.7818};
const DEFAULT_ZOOM = 10;
export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${google.apiKey}`;

interface MapProps {
  markers: LocationData[];
}

const Map: ComponentClass<MapProps &
  WithGoogleMapProps &
  WithScriptjsProps> = withScriptjs(
  withGoogleMap(({markers}) => {
    return (
      <GoogleMap
        defaultCenter={CENTER}
        defaultZoom={DEFAULT_ZOOM}
        options={{disableDefaultUI: true}}>
        {markers.map(({latitude, longitude}, index) => (
          <Marker
            key={index}
            position={{lat: Number(latitude), lng: Number(longitude)}}
          />
        ))}
      </GoogleMap>
    );
  })
);

const LocationsMap: FC = () => {
  const {isLoading, data} = useAsync<LocationData[]>(getLocations);

  return (
    <Map
      markers={isLoading || !data ? [] : data}
      googleMapURL={GOOGLE_MAP_URL}
      loadingElement={<div style={{height: `100%`}} />}
      containerElement={<div style={{height: `400px`}} />}
      mapElement={<div style={{height: `100%`}} />}
    />
  );
};

export default LocationsMap;
