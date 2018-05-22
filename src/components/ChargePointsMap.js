import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { object, array } from 'prop-types';

import { config } from '../config';

class ChargePointsMap extends Component {
  static defaultProps = {
    mapProps: {
      defaultZoom: 8,
      defaultCenter: { lat: 52.367984, lng: 4.897242 }
    },
    userData: []
  };

  static propTypes = {
    mapProps: object,
    userData: array
  };

  renderMarkers() {
    const { userData } = this.props;

    return userData.map(({ lat, lng }, index) => (
      <Marker position={{ lat, lng }} key={`marker-${index}`} />
    ));
  }

  render() {
    const { mapProps } = this.props;

    <GoogleMap {...mapProps}>{this.renderMarkers()}</GoogleMap>
  }
}

const enhancedComponent = compose(
  withProps({
    googleMapURL: config.googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(ChargePointsMap);

export default enhancedComponent;
