import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

const Pin = styled.div`
  position: absolute;
  transform: translate(-50%, -30%);
`;

const Popup = styled.div`
  width: 16rem;
  height: 16rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background: white;
  border: 1px solid #bbbbbb;
  position: absolute;
  top: 40px;
  left: -70px;
  padding: 1rem;
  border-radius: 5px;

  p {
    font-size: 1.4rem;
    line-height: 1.6rem
  }

  a {
    font-size: 1.2rem;
    line-height: 1.4rem
  }
`;

const Q = (props, { t }) => {
  const [popupActive, setPopupVisibility] = useState(false);
  return (
    <>
      <Pin
        onClick={() => setPopupVisibility(!popupActive)}
      >
        <img src="/static/q.svg" alt="" style={{ width: '4rem' }} />
      </Pin>
      {popupActive && (
      <Popup>
        <p>{t('Российский квантовый центр')}</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.com/maps/dir//Russian+Quantum+Center,+121205,+Россия,+Москва,+территория+Инновационного+центра+«Сколково»,+Bol'shoy+Bul'var,+д.+30,+стр.+1,+Skolkovo+Innovation+Center,+Moscow+Oblast,+Russia,+143026/@55.699581,37.3573277,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x46b54e6bd69b82e9:0x32cf7cd0041cef2!2m2!1d37.3595164!2d55.699581!3e0"
        >
          {t('Проложить маршрут на Гугл картах')}
        </a>
      </Popup>
      )
      }
    </>
  );
};

Q.contextTypes = {
  t: PropTypes.func,
};

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 55.698581,
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
