import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import TeamPropType from './TeamPropType';
import hostName from '../../host';


const PubHead = ({ item }) => (
  <Head>
    <title>{item.data.groupname[0] && item.data.groupname[0].text}</title>
    <meta property="og:url" content={`${hostName}/team/${item.uid}`} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={item.data.groupname[0] && item.data.groupname[0].text} />
    <meta property="og:description" content={item.data.description[0] && item.data.description[0].text} />
    <meta property="og:image" content={item.data.image_gallery[0] && item.data.image_gallery[0].labimage.url} />
    <meta property="og:image:width" content={item.data.image_gallery[0] && item.data.image_gallery[0].labimage.dimensions.width} />
    <meta property="og:image:height" content={item.data.image_gallery[0] && item.data.image_gallery[0].labimage.dimensions.height} />
  </Head>
);

PubHead.contextTypes = {
  t: PropTypes.func,
};

PubHead.propTypes = TeamPropType;

PubHead.defaultProps = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      groupname: PropTypes.arrayOf(PropTypes.shape({
        text: '',
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: '',
      })),
      image_gallery: PropTypes.arrayOf(PropTypes.shape({
        labimage: PropTypes.shape({
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
