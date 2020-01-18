import PropTypes from 'prop-types'

const eventType = PropTypes.shape({
  item: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      additional: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      wallpaper: PropTypes.shape({
        url: PropTypes.string,
        largecard: PropTypes.shape({
          url: PropTypes.string,
        }),
        largecardIpad: PropTypes.shape({
          url: PropTypes.string,
        }),
        allcardsMobile: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      start_date_time: PropTypes.string,
      end_date: PropTypes.string,
    }),
  }),
})

export default eventType
