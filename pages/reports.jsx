// core modules
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// actions
import * as aboutActions from '../redux/actions/about';
import * as langActions from '../redux/actions/lang';

// components
import Loading from '../components/shared/loading';
import ReportCard from '../components/reports/ReportCard';
import ReportsHead from '../components/reports/ReportHead';

class Reports extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    static async getInitialProps(ctx) {
      // получаем значение fb_locale от робота Facebook
      const { reduxStore, query } = ctx;
      const { fb_locale } = query;

      return { fb_locale };
    }

    componentDidMount() {
      const { lang, fetchAbout } = this.props;
      window.scrollTo(0, 0);
      fetchAbout(lang);
    }

    componentDidUpdate(prevProps) {
      const { lang, fetchAbout } = this.props;

      // обработка смены языка
      if (lang !== prevProps.lang) {
        fetchAbout(lang);
      }
    }

    render() {
      const { fb_locale } = this.props;
      const { page, isFetching } = this.props.about;
      const { t } = this.context;
      console.log('annual reports', this.props);
      if (isFetching) return <Loading />;
      return (
        <div className="evaluation-reports-page">
          <ReportsHead fbLocale={fb_locale} />
          <div className="container">
            <h1>
              {t('Годовые отчеты')}
            </h1>
            <div className="columns">
              {page.data
                && page.data.body1[0].items.map(item => <ReportCard item={item} key={item.report_url.url} />)}
            </div>
          </div>
        </div>
      );
    }
}


const mapStateToProps = (state) => {
  const { about } = state;
  const { lang } = state.i18nState;
  return { about, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  aboutActions,
  langActions), dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Reports);
