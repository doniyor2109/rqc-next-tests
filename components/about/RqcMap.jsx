import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

const Pin = styled.div`
  position: absolute;
  transform: translate(-50%, -30%);
`;

const Popup = styled.div`
  width: 16rem;
  display: flex;
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

  button {
    font-size: 1.2rem;
    line-height: 1.4rem;
    text-align: left;
    color: #3998D1;
    text-decoration: underline;
    padding: 0;
    background: none;
    border: none;
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
        <p>{t('Российский Квантовый Центр')}</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          href="https://maps.google.com?daddr=55.699581,37.3593172&amp;ll="
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

const SimpleMap = ({ lang, center, zoom }) => (
  // Important! Always set the container height explicitly
  <div style={{ height: '100%', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: 'AIzaSyDlEYYUyohoQls09d77mxgp8Q-jBnWAZgk',
        language: lang,
      }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Q
        lat={55.699581}
        lng={37.3593172}
      />
    </GoogleMapReact>
  </div>
);

SimpleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  lang: PropTypes.string,
};

SimpleMap.defaultProps = {
  center: {
    lat: 55.698581,
    lng: 37.359,
  },
  zoom: 15,
  lang: 'ru',
};

export default SimpleMap;
