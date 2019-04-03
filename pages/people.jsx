// core
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';

// actions
import * as peopleActions from '../redux/actions/people';
import * as langActions from '../redux/actions/lang';

// components
import { Loading } from '../components/shared/loading';
import PeopleHead from '../components/people/PeopleHead';
import PeopleSection from '../components/people/PeopleSection';

class People extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    static propTypes = {
      phone: PropTypes.bool,
      fb_locale: PropTypes.string,
      people: PropTypes.shape({
        isFetching: PropTypes.bool,
        page: PropTypes.arrayOf(PropTypes.shape({
          items: PropTypes.arrayOf(PropTypes.shape),
          primary: PropTypes.shape({
            team_section: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
            hash: PropTypes.string,
          }),
        })),
      }),
      lang: PropTypes.string,
      fetchPeople: PropTypes.func.isRequired,
    }

    static defaultProps = {
      phone: false,
      fb_locale: 'undefined',
      people: {
        isFetching: false,
        page: [],
      },
      lang: 'ru',
    }

    static async getInitialProps(ctx) {
      // получаем все необходимое для рендеринга компонента от сервера
      const { reduxStore } = ctx;

      // получаем настройки языка из кукис
      const { language } = cookies(ctx);

      // запрос к Prismic через redux actons с добавлением контента в redux store
      const serverFetch = await peopleActions.getPeopleContent(language);
      const peopleSections = [];
      Object.keys(serverFetch.data).forEach((key) => {
        if (key.startsWith('body')) {
          peopleSections.push(serverFetch.data[key][0]);
        }
      });

      reduxStore.dispatch(peopleActions.fetchPeopleSuccess(peopleSections));

      return {};
    }

    componentDidUpdate(prevProps) {
      const { lang, fetchPeople } = this.props;
      if (lang !== prevProps.lang) {
        fetchPeople(lang);
      }
    }

    render() {
      const { phone, fb_locale, people } = this.props;
      const { page, isFetching } = people;

      if (isFetching) return <Loading />;
      return (
        <section className="peoplepage">
          <PeopleHead fbLocale={fb_locale} />
          <div className="container">
            {page.map(section => (
              <PeopleSection
                item={section}
                key={section.primary.team_section[0] && section.primary.team_section[0].text}
                phone={phone}
              />
            ))}
          </div>
        </section>

      );
    }
}


const mapStateToProps = (state) => {
  const { people } = state;
  const { lang } = state.i18nState;
  return { people, lang };
};


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  peopleActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
