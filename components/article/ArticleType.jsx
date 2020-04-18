import PropTypes from 'prop-types'

const ArticleType = {
  item: PropTypes.shape({
    data: PropTypes.shape({
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
      cover: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
        url: PropTypes.string,
        photo_title: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    uid: PropTypes.string,
  }),
}

export default ArticleType
