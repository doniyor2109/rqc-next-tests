import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import PhotoType from './PhotoPropType';
import hostName from '../../host';


const PubHead = ({ item }) => (
  <Head>
    <title>{item.data.title[0] && item.data.title[0].text}</title>
    <meta property="og:url" content={`${hostName}/photo/${item.uid}`} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={item.data.title[0] && item.data.title[0].text} />
    <meta property="og:description" content={item.data.description[0] && item.data.description[0].text} />
    <meta property="og:image" content={item.data.photo_set[0] && item.data.photo_set[0].photo.url} />
    <meta property="og:image:width" content={item.data.photo_set[0] && item.data.photo_set[0].photo.dimensions.width} />
    <meta property="og:image:height" content={item.data.photo_set[0] && item.data.photo_set[0].photo.dimensions.height} />
  </Head>
);

PubHead.contextTypes = {
  t: PropTypes.func,
};

PubHead.propTypes = PhotoType;

PubHead.defaultProps = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.shape({
        text: 'Photo gallery',
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: '',
      })),
      photo_set: PropTypes.arrayOf(PropTypes.shape({
        photo: PropTypes.shape({
          dimensions: PropTypes.shape({
            width: 730,
            height: 490,
          }),
          url: '',
        }),
      })),
    }),
    uid: '',
  }),
};

export default PubHead;
