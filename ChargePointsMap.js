import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const mockData = require('./mock-chargepoints.json');

const ChargePointsMap = (props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 52.367984, lng: 4.897242 }}
  >
    {
      mockData.map(({ lat, lng }, index) => {
        return <Marker position={{ lat, lng }} key={`marker-${index}`} />
      })
    }
  </GoogleMap>
);

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(ChargePointsMap);
