/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import GalleryCard from './GalleryCard';
import Loading from '../shared/loading';

class PhotoGalleries extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    items: [],
  }

  state = {
    itemsNumber: this.props.initialItems,
  }

  componentDidMount() {
    const { fetchItems, lang, initialItems } = this.props;
    fetchItems(lang, initialItems);
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemsNumber } = this.state;
    const { fetchItems, lang } = this.props;

    if (itemsNumber !== prevState.itemsNumber) {
      fetchItems(lang, itemsNumber);
    }
    // обработка смены языка
    if (lang !== prevProps.lang) {
      fetchItems(lang, itemsNumber);
    }
  }

  getMoreNews() {
    const { itemsNumber } = this.state;
    const { morenews } = this.props;
    this.setState({
      itemsNumber: itemsNumber + morenews,
    });
  }

  render() {
    const {
      items, isFetching, nextPage, lang, initialItems,
    } = this.props;

    const { itemsNumber } = this.state;
    if (initialItems === itemsNumber && isFetching) return <Loading />;
    return (
      <>
        <div className="columns is-multiline">
          {items.map(item => <GalleryCard item={item} key={item.uid} lang={lang} />)}
        </div>
        <div className="more-news">
          <div className="columns">
            <div className="column is-centered">
              {initialItems < itemsNumber && isFetching && <Loading />}
              <hr />
              {nextPage
                && <img className="more" alt="show more news" onClick={this.getMoreNews} src="/static/more.svg" />
                }
            </div>
          </div>
        </div>
      </>
    );
  }
}

PhotoGalleries.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      photo_set: PropTypes.arrayOf(PropTypes.shape({
        photo: PropTypes.shape({
          thumbnail: PropTypes.shape({
            url: PropTypes.string,
          }),
          alt: PropTypes.string,
        }),
      })),
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

PhotoGalleries.defaultProps = {
  items: [],
  nextPage: null,
};

export default PhotoGalleries;
