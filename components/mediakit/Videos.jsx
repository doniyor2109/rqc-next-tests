import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loading from '../shared/loading';
import VideoCard from './VideoCard';

class Videos extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    itemsNumber: this.props.initialItems,
  };

  componentDidMount() {
    const { fetchItems, lang, initialItems } = this.props;
    fetchItems(lang, initialItems);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchItems, lang } = this.props;
    const { itemsNumber } = this.state;
    if (itemsNumber !== prevState.itemsNumber) {
      fetchItems(lang, itemsNumber);
    }

    // обработка смены языка
    if (lang !== prevProps.lang) {
      fetchItems(lang, itemsNumber);
    }
  }

  getMoreVideos() {
    const { morenews } = this.props;
    const { itemsNumber } = this.state;
    this.setState({
      itemsNumber: itemsNumber + morenews,
    });
  }

  render() {
    const {
      items, isFetching, nextPage, initialItems,
    } = this.props;
    const { itemsNumber } = this.state;

    if (initialItems === itemsNumber && isFetching) { return <Loading />; }
    return (
      <Fragment>
        <div className="columns is-multiline">
          {items.map(item => (
            <VideoCard item={item} key={item.uid} />
          ))}
        </div>
        <div className="more-news">
          <div className="columns">
            <div className="column is-centered">
              {initialItems < itemsNumber
                  && isFetching && <Loading />}
              <hr />
              {nextPage && (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <img
                className="more"
                alt="show more news"
                onClick={this.getMoreVideos}
                src="/static/more.svg"
              />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Videos.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      youtube_link: PropTypes.shape({
        html: PropTypes.string,
      }),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  initialItems: PropTypes.number.isRequired,
  morenews: PropTypes.number.isRequired,
  nextPage: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

Videos.defaultProps = {
  items: [],
  nextPage: null,
};

export default Videos;
