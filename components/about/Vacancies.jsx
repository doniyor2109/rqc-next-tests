import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as vacanciesActions from '../../redux/actions/vacancies';
import Loading from '../shared/loading';
import VacanciesPrismic from './VacanciesPrismic';
import VacanciesHH from './VacanciesHH';
import PageHeading from '../shared/PageHeading';
import Paragraph from '../shared/styled/Paragraph';

const Styled = styled.section`
  margin-top: 9rem;
  padding: 6rem 0;
  background-color: #F7F9FB;
`;

class Vacancies extends React.Component {
  static propTypes = {
    phone: PropTypes.string,
    tablet: PropTypes.string,
    lang: PropTypes.string,
    fetchVacancies: PropTypes.func.isRequired,
    fetchVacanciesHH: PropTypes.func.isRequired,
    vacancies: PropTypes.shape(),
  }

  static defaultProps = {
    phone: null,
    tablet: null,
    lang: 'ru',
    vacancies: [],
  }

  state = {
    popupKey: -1,
    vacanciesNumberDesktop: 6,
    vacanciesNumberTablet: 4,
    vacanciesNumberMobile: 3,
    moreVacanciesButtonPresent: true,
    cardoffsetTop: 0,
  }

  componentDidMount() {
    const { lang, fetchVacanciesHH, fetchVacancies } = this.props;
    if (lang === 'en-gb') {
      fetchVacancies(lang);
    } else {
      fetchVacanciesHH();
    }
  }

  componentDidUpdate(prevProps) {
    // обработка смены языка
    const { lang, fetchVacanciesHH, fetchVacancies } = this.props;
    if (lang !== prevProps.lang) {
      if (lang === 'en-gb') {
        fetchVacancies(lang);
      } else {
        fetchVacanciesHH();
      }
    }
  }

  moreVacanciesHH = () => {
    const { vacancies } = this.props;
    this.setState({
      vacanciesNumberDesktop: vacancies.itemsHH.length,
      vacanciesNumberTablet: vacancies.itemsHH.length,
      vacanciesNumberMobile: vacancies.itemsHH.length,
      moreVacanciesButtonPresent: false,
    });
  }

  moreVacancies = () => {
    const { vacancies } = this.props;
    this.setState({
      vacanciesNumberDesktop: vacancies.items.length,
      vacanciesNumberTablet: vacancies.items.length,
      vacanciesNumberMobile: vacancies.items.length,
      moreVacanciesButtonPresent: false,
    });
  }

  handleClick = (cardNumber, offset) => {
    this.setState({
      popupKey: cardNumber,
      cardoffsetTop: offset,
    });
    document.body.classList.add('noscroll');
  }

  popupClose = (e) => {
    const { cardoffsetTop } = this.state;
    e.preventDefault();
    this.setState({ popupKey: -1 });
    document.body.classList.remove('noscroll');
    const vac = document.getElementById('vacancies').offsetTop + cardoffsetTop;
    window.scrollTo({
      top: vac,
      behavior: 'auto',
    });
  }

  render() {
    const {
      vacancies, phone, tablet, lang,
    } = this.props;
    const {
      popupKey, vacanciesNumberDesktop, vacanciesNumberTablet,
      vacanciesNumberMobile, moreVacanciesButtonPresent, cardoffsetTop,
    } = this.state;
    const { t } = this.context;
    if (vacancies.isFetchingPrismic || vacancies.isFetchingManyHH) return <Loading />;
    return (
      <div id="vacancies">
        <Styled>
          <div className="container">
            <PageHeading title="Работа у нас" />
            <Paragraph>
              {t('Присоединяйтесь к команде RQC')}
              !
              <br />
              {t('Чтобы откликнуться на вакансию, присылайте резюме на почту')}
              :&nbsp;
              <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
            </Paragraph>
            {lang === 'en-gb'
              ? (
                <VacanciesPrismic
                  vacancies={vacancies}
                  popupKey={popupKey}
                  vacanciesNumberDesktop={vacanciesNumberDesktop}
                  vacanciesNumberTablet={vacanciesNumberTablet}
                  vacanciesNumberMobile={vacanciesNumberMobile}
                  moreVacanciesButtonPresent={moreVacanciesButtonPresent}
                  cardoffsetTop={cardoffsetTop}
                  moreVacancies={this.moreVacancies}
                  handleClick={this.handleClick}
                  popupClose={this.popupClose}
                  phone={phone}
                  tablet={tablet}
                />
              )
              : (
                <VacanciesHH
                  vacancies={vacancies}
                  popupKey={popupKey}
                  vacanciesNumberDesktop={vacanciesNumberDesktop}
                  vacanciesNumberTablet={vacanciesNumberTablet}
                  vacanciesNumberMobile={vacanciesNumberMobile}
                  moreVacanciesButtonPresent={moreVacanciesButtonPresent}
                  cardoffsetTop={cardoffsetTop}
                  moreVacancies={this.moreVacanciesHH}
                  handleClick={this.handleClick}
                  popupClose={this.popupClose}
                  phone={phone}
                  tablet={tablet}
                />
              )}
          </div>
        </Styled>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { vacancies, language } = state;
  const { lang } = state.i18nState;
  return { vacancies, lang, language };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  vacanciesActions), dispatch);

Vacancies.contextTypes = {
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);
