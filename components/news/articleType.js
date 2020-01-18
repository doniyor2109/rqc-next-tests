import PropTypes from 'prop-types'

const articleType = PropTypes.shape({
  alternate_languages: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
    })
  ),
  data: PropTypes.shape({
    body: PropTypes.arrayOf(
      PropTypes.shape({
        primary: PropTypes.shape({
          news_body: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
              dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
              }),
              url: PropTypes.string,
              type: PropTypes.string,
            })
          ),
        }),
      })
    ),
    cover: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      url: PropTypes.string,
      ipad: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
          url: PropTypes.string,
        }),
      }),
      iphone: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
          url: PropTypes.string,
        }),
      }),
      thumbnail4: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
          url: PropTypes.string,
        }),
      }),
      thumbnail8: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
          url: PropTypes.string,
        }),
      }),
    }),
    manual_date_of_publication: PropTypes.string,
    title: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    title_description: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
  }),
  id: PropTypes.string,
  lang: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  uid: PropTypes.string,
})

export default articleType
