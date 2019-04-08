// core modules
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

// actions
import { Link, RichText } from 'prismic-reactjs';
import Prismic from 'prismic-javascript';
import * as photoActions from '../redux/actions/photo';
import * as langActions from '../redux/actions/lang';

// components
import Loading from '../components/shared/loading';
import PhotoPopup from '../components/mediakit/PhotoPopup';
import PhotoHead from '../components/mediakit/PhotoHead';
import PhotoType from '../components/mediakit/PhotoPropType';
import PhotoPage from '../components/mediakit/PhotoStyle';


// other libraries
import PrismicConfig from '../prismic-configuration';


const propTypes = {
  contentLang: PropTypes.string,
  lang: PropTypes.string,
  language: PropTypes.shape({
    userClicked: PropTypes.number,
  }),
  photo: PropTypes.shape({
    isFetching: PropTypes.bool,
    item: PropTypes.shape(PhotoType),
  }),
  switchLanguageProgrammatically: PropTypes.func.isRequired,
};

const defaultProps = {
  contentLang: 'ru',
  lang: 'ru',
  language: PropTypes.shape({
    userClicked: 0,
  }),
  photo: PropTypes.shape({
    isFetching: 'true',
    item: {},
  }),
};


class Photo extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    constructor(props) {
      super(props);
      this.state = {
        popupKey: -1,
      };
      this.handleClick = this.handleClick.bind(this);
      this.popupClose = this.popupClose.bind(this);
    }

    static async getInitialProps(ctx) {
      const { reduxStore, query: { uid } } = ctx;
      let contentLang = '';

      reduxStore.dispatch(photoActions.fetchPhotoByUidRequest(uid));
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
      await api.query(Prismic.Predicates.at('my.mediakit_photo_gallery.uid', uid), { lang: '*' })
        .then((response) => {
          reduxStore.dispatch(photoActions.fetchPhotoByUidSuccess(uid, response));
          // из ответа API Prismic берем значение языка, на котором создан контент
          // и потом передаем его в props.
          // Это нужно для странных случаев, когда язык, например, "ru", но
          // но пользователь открывает ссылку вида .../photo/lab-of-quantum...
          // которая явно предполагает наличие английского языка в интерфейсе
          contentLang = response.results[0].lang;
        })
        .catch(error => reduxStore.dispatch(photoActions.fetchPhotoByUidFailure(uid, error)));


      return { uid, contentLang };
    }

    componentDidMount() {
      const { contentLang, lang, switchLanguageProgrammatically } = this.props;
      if (contentLang !== lang) {
        switchLanguageProgrammatically(contentLang);
      }
    }

    componentDidUpdate(prevProps) {
      const { language, lang, photo } = this.props;
      const { alternate_languages } = photo.item;

      // если глобально меняется язык и мы знаем, что он поменялся в результате
      // действий пользователя (userClicked), то редиректим пользователя на страницу с другим uid
      // если бы мы не было флага userClicked, то компонент бы уходил в бесконечный цикл
      // из-за изменения языка в componentDidMount()

      if ((lang !== prevProps.lang) && (language.userClicked !== prevProps.language.userClicked)) {
        if (alternate_languages.length > 0) {
          Router.push(`/photo/${alternate_languages[0].uid}`, `/photo/${alternate_languages[0].uid}`, { shallow: true });
        }
      }
    }

    handleClick(e, cardNumber) {
      e.preventDefault();
      this.setState({
        popupKey: cardNumber,
      });
      document.body.classList.add('noscroll');
    }

    popupClose(e) {
      e.preventDefault();
      this.setState({ popupKey: -1 });
      document.body.classList.remove('noscroll');
    }

    render() {
      const { photo } = this.props;
      const { isFetching, item } = photo;
      const { popupKey } = this.state;
      const { t } = this.context;
      // console.log('photogallery', this.props);
      if (isFetching) return <Loading />;
      return (
        <PhotoPage>
          <PhotoHead item={item} />
          {item.data
              && (
              <div className="container">
                {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                <div className="columns is-multiline">
                  <div className="column is-7-desktop is-12-tablet">
                    <div className="description">
                      {RichText.render(item.data.description, PrismicConfig.linkResolver)}
                    </div>
                  </div>
                  <div className="column is-5-desktop">
                    <div className="download_wrapper">
                      <a href={Link.url(item.data.archive_url)} target="_blank" rel="noopener noreferrer">
                        <button className="download" type="button" />
                        <p>{t('Скачать архив')}</p>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="columns is-multiline is-mobile">
                  {item.data.photo_set.map((element, index) => (
                    <div className="column is-6-mobile is-4-tablet is-3-desktop" key={element.photo.url}>
                      <button onClick={(e) => { this.handleClick(e, index); }} type="button">
                        <img
                          src={element.photo.thumbnail.url}
                          alt={element.photo.alt}
                        />
                      </button>
                      <PhotoPopup
                        key={element.photo.url}
                        i={index}
                        item={element}
                        uid={item.uid}
                        gallery_title={item.data.title[0].text}
                        photo_set={item.data.photo_set}
                        active={popupKey === index}
                        close={this.popupClose}
                      />
                    </div>
                  ))}
                </div>
              </div>
              )
            }
        </PhotoPage>
      );
    }
}

const mapStateToProps = (state) => {
  const { photo, language } = state;
  const { lang } = state.i18nState;
  return { photo, lang, language };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  photoActions,
  langActions), dispatch);

Photo.propTypes = propTypes;
Photo.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
