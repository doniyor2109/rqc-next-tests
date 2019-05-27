import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';

import * as educationActions from '../redux/actions/education';
import * as langActions from '../redux/actions/lang';

import EducationHead from '../components/education/EducationHead';
import EducationPage from '../components/education/EducationPage';
import PageHeading from '../components/shared/PageHeading';
import H3 from '../components/shared/styled/H3';
import Projects from '../components/education/Projects';
import Institute from '../components/education/Institute';
import Mfti from '../components/education/Mfti';

class Education extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    lang: PropTypes.string.isRequired,
    phone: PropTypes.bool,
    fb_locale: PropTypes.string,
    fetchEducation: PropTypes.func.isRequired,
    education: PropTypes.shape({
      isFetching: PropTypes.bool,
      page: PropTypes.shape({
        data: PropTypes.shape({
          description: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
          })),
          teamlead: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
            projects: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
            group: PropTypes.shape({
              uid: PropTypes.string,
            }),
            email: PropTypes.string,
            cv: PropTypes.shape({
              url: PropTypes.string,
            }),
          })),
        }),
      }),
    }),
  }

  static defaultProps = {
    phone: false,
    fb_locale: 'ru',
    education: {},
  }

  static defaultProps = {
    phone: true,
    fb_locale: 'ru',
  }

  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const { reduxStore, query } = ctx;
    const { fb_locale } = query;

    // получаем настройки языка из кукис
    const { language } = cookies(ctx);

    // запрос к Prismic через redux actons с добавлением контента в redux store
    try {
      const educationContent = await educationActions.getEducationContent(language);
      reduxStore.dispatch(educationActions.fetchEducationSuccess(educationContent));
    } catch (error) {
      reduxStore.dispatch(educationActions.fetchEducationFailure(error));
    }

    return { fb_locale };
  }

  componentDidUpdate(prevProps) {
    const { lang, fetchEducation } = this.props;
    if (lang !== prevProps.lang) {
      fetchEducation(lang);
    }
  }

  render() {
    const {
      fb_locale, education, phone,
    } = this.props;

    const { t } = this.context;
    const { page } = education;

    console.log('education', this.props);
    return (
      <EducationPage>
        <EducationHead fbLocale={fb_locale} />
        <div className="container">

          {/* Заголовок и описание страницы */}
          <PageHeading title="Образование" />
          <div className="columns">
            <div className="column is-9-desktop is-12-tablet is-12-mobile">
              <div className="description">
                {RichText.render(page.data.description, PrismicConfig.linkResolver)}
              </div>
            </div>
          </div>
        </div>

        {/* РКЦ & МФТИ */}
        <Mfti
          form_call_to_action={page.data.form_call_to_action}
          text={page.data.mfti_description}
          heading={page.data.mfti_heading}
          mfti_aspirantura={page.data.mfti_aspirantura}
          mfti_bachelor={page.data.mfti_bachelor}
          mfti_magistratura={page.data.mfti_magistratura}
          magistratura={page.data.magistratura}
        />

        <div className="container">
          {/* РКЦ и МИСиС */}
          <Institute
            heading={page.data.misis_heading}
            text={page.data.misis}
          />

          {/* РКЦ и РВК */}
          <Institute
            heading={page.data.rvk_heading}
            text={page.data.rvk}
            last
          />

          {/* Дипломные проекты */}
          <H3>
            {t('Список дипломных проектов')}
          </H3>
        </div>
        <Projects items={page.data.teamlead} phone={phone} />
      </EducationPage>
    );
  }
}

// Redux функции state и dispatch
const mapStateToProps = (state) => {
  const { education } = state;
  const { lang } = state.i18nState;
  return { education, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  educationActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Education);
