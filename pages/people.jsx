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
import Loading from '../components/shared/loading';
import PeopleHead from '../components/people/PeopleHead';
import PeopleSection from '../components/people/PeopleSection';
import PageHeading from '../components/shared/PageHeading';
import PageDescription from '../components/shared/PageDescription';


class People extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    static propTypes = {
      phone: PropTypes.string,
      tablet: PropTypes.string,
      fb_locale: PropTypes.string,
      people: PropTypes.shape({
        isFetching: PropTypes.bool,
        page: PropTypes.shape({
          items: PropTypes.arrayOf(PropTypes.shape),
          primary: PropTypes.shape({
            team_section: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
            hash: PropTypes.string,
          }),
        }),
      }),
      lang: PropTypes.string,
      fetchPeople: PropTypes.func.isRequired,
    }

    static defaultProps = {
      phone: null,
      tablet: null,
      fb_locale: 'undefined',
      people: {
        isFetching: false,
        page: [],
      },
      lang: 'ru',
    }

    static async getInitialProps(ctx) {
      // получаем все необходимое для рендеринга компонента от сервера
      const { reduxStore, query: { fb_locale } } = ctx;

      // получаем настройки языка из кукис
      const { language } = cookies(ctx);

      // запрос к Prismic через redux actons с добавлением контента в redux store
      const serverFetch = await peopleActions.getPeopleContent(language);
      // const serverFetchQ = await peopleActions.getPeopleContentGraph(language);
      reduxStore.dispatch(peopleActions.fetchPeopleSuccess(serverFetch));

      return { fb_locale };
    }

    componentDidMount() {
      const { hash } = window.location;
      const elmnt = document.getElementById(hash.slice(1));
      console.log("hash", hash);
      if (elmnt) {
        console.log('scrolling', elmnt.offsetTop);
        elmnt.scrollIntoView({ block: "start"} );
      }
    }

    componentDidUpdate(prevProps) {
      const { lang, fetchPeople } = this.props;
      if (lang !== prevProps.lang) {
        fetchPeople(lang);
      }
    }

    render() {
      const {
        phone, tablet, fb_locale, people, lang,
      } = this.props;
      const { page, isFetching } = people;
      console.log('people', this.props);
      if (isFetching) return <Loading />;
      return (
        <section className="peoplepage">
          <PeopleHead fbLocale={fb_locale} />
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-9-desktop is-12-tablet  is-12-mobile">
                <PageHeading title="Люди" />
                <PageDescription description={page.data.description} />
              </div>
            </div>
            {(page.data.body.length > 0) && page.data.body.map((section, index) => (
              <PeopleSection
                item={section}
                key={(section.primary.title && section.primary.title[0].text)
                  || (section.primary.subtitle && section.primary.subtitle[0].text)}
                phone={phone}
                tablet={tablet}
                structure={index === 0}
                lang={lang}
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
