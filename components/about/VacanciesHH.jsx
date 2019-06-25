import React, { Fragment } from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import VacancyCardHH from './VacancyCardHH';
import VacancyPopupHH from './VacancyPopupHH';
import ButtonMore from '../shared/ButtonMore';
import VacanciesBlock from './styled/VacanciesBlock';

const VacanciesHH = (props) => {
  const {
    phone,
    tablet,
    vacanciesNumberDesktop,
    vacanciesNumberTablet,
    vacanciesNumberMobile,
    handleClick,
    popupKey,
    popupClose,
    moreVacanciesButtonPresent,
    moreVacancies,
    vacancies,
  } = props;

  return (
    <VacanciesBlock>
      <div className="columns is-multiline">
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null && tablet === null}
          render={() => (
            <>
              {vacancies.itemsHH.slice(0, vacanciesNumberDesktop).map((item, index) => (
                <Fragment key={item.name}>
                  <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                  <VacancyPopupHH
                    key={item.name}
                    url={item.url}
                    item={vacancies.vacanciesbyID.filter(
                      el => el.id === item.id,
                    ).reduce((acc, val) => acc = val, [])}
                    active={popupKey === index}
                    close={popupClose}
                  />
                </Fragment>
              ))}
              {moreVacanciesButtonPresent
                && (vacancies.itemsHH.length > vacanciesNumberDesktop)
                && (
                <ButtonMore onClick={moreVacancies} />
                )
              }
            </>
          )}
        />

        <Media
          query="(min-width: 416px) and (max-width: 768px)"
          defaultMatches={tablet !== null}
          render={() => (
            <>
              {vacancies.itemsHH.slice(0, vacanciesNumberTablet).map((item, index) => (
                <Fragment key={item.name}>
                  <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                  <VacancyPopupHH
                    key={item.name}
                    url={item.url}
                    item={vacancies.vacanciesbyID.filter(
                      el => el.id === item.id,
                    ).reduce((acc, val) => acc = val, [])}
                    active={popupKey === index}
                    close={popupClose}
                  />
                </Fragment>
              ))}
              {moreVacanciesButtonPresent
                && (vacancies.itemsHH.length > vacanciesNumberTablet)
                && (
                <ButtonMore onClick={moreVacancies} />
                )
              }
            </>
          )}
        />

        <Media
          query="(max-width: 415px)"
          defaultMatches={phone !== null}
          render={() => (
            <>
              {vacancies.itemsHH.slice(0, vacanciesNumberMobile).map((item, index) => (
                <Fragment key={item.name}>
                  <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                  <VacancyPopupHH
                    key={item.name}
                    url={item.url}
                    item={vacancies.vacanciesbyID.filter(
                      el => el.id === item.id,
                    ).reduce((acc, val) => acc = val, [])}
                    active={popupKey === index}
                    close={popupClose}
                  />
                </Fragment>
              ))}
              {moreVacanciesButtonPresent
                && (vacancies.itemsHH.length > vacanciesNumberMobile)
                && (
                  <ButtonMore onClick={moreVacancies} />
                )
              }
            </>
          )}
        />
      </div>
    </VacanciesBlock>
  );
};

VacanciesHH.propTypes = {
  phone: PropTypes.string,
  tablet: PropTypes.string,
  vacanciesNumberDesktop: PropTypes.number,
  vacanciesNumberTablet: PropTypes.number,
  vacanciesNumberMobile: PropTypes.number,
  popupKey: PropTypes.number,
  moreVacanciesButtonPresent: PropTypes.bool,
  moreVacancies: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  popupClose: PropTypes.func.isRequired,
  vacancies: PropTypes.shape({
    itemsHH: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

VacanciesHH.defaultProps = {
  phone: null,
  tablet: null,
  vacanciesNumberDesktop: 6,
  vacanciesNumberTablet: 4,
  vacanciesNumberMobile: 3,
  popupKey: -1,
  moreVacanciesButtonPresent: true,
  vacancies: {},
};

export default VacanciesHH;
