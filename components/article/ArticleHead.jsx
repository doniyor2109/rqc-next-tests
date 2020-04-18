import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import ArticleType from './ArticleType'
import hostName from '../../host'

const ArticleHead = ({ item }) => (
  <Head>
    <title>{item.data.title[0] && item.data.title[0].text}</title>
    <meta property="og:url" content={`${hostName}/photo/${item.uid}`} />
    <meta property="og:type" content="article" />
    <meta
      property="og:title"
      content={item.data.title[0] && item.data.title[0].text}
    />
    <meta
      property="og:description"
      content={
        item.data.title_description[0] && item.data.title_description[0].text
      }
    />
    <meta
      property="og:image"
      content={item.data.cover && item.data.cover.url}
    />
    <meta
      property="og:image:width"
      content={item.data.cover.dimensions && item.data.cover.dimensions.width}
    />
    <meta
      property="og:image:height"
      content={item.data.cover.dimensions && item.data.cover.dimensions.height}
    />
  </Head>
)

ArticleHead.contextTypes = {
  t: PropTypes.func,
}

ArticleHead.propTypes = ArticleType

ArticleHead.defaultProps = {
  item: {
    data: {
      title: [
        {
          text: '',
        },
      ],
      title_description: [
        {
          text: '',
        },
      ],
    },
    uid: '',
  },
}

export default ArticleHead
