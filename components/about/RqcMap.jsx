import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Q = () => (
  <div style={{ textAlign: 'center', position: 'absolute', transform: 'translate(-50%, -30%)'}}>
    <img src="/static/q.svg" style={{ width: '4rem' }} />
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 55.7,
      lng: 37.359,
    },
    zoom: 15,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDlEYYUyohoQls09d77mxgp8Q-jBnWAZgk' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Q
            lat={55.699581}
            lng={37.3593172}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
