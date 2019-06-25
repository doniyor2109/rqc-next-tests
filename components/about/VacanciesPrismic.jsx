import React, { Fragment } from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import VacancyCard from './VacancyCard';
import VacancyPopup from './VacancyPopup';
import ButtonMore from '../shared/ButtonMore';
import VacanciesBlock from './styled/VacanciesBlock';

const VacanciesPrismic = (props) => {
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
      <Media
        query="(min-width: 769px)"
        defaultMatches={phone === null && tablet === null}
        render={() => (
          <>
            {vacancies.items.slice(0, vacanciesNumberDesktop).map((item, index) => (
              <Fragment key={item.data.name[0].text}>
                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                <VacancyPopup item={item} active={popupKey === index} close={popupClose} />
              </Fragment>
            ))}
            {moreVacanciesButtonPresent
                && (vacancies.items.length > vacanciesNumberDesktop)
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
            {vacancies.items.slice(0, vacanciesNumberTablet).map((item, index) => (
              <Fragment key={item.data.name[0].text}>
                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                <VacancyPopup item={item} active={popupKey === index} close={popupClose} />
              </Fragment>
            ))}
            {moreVacanciesButtonPresent
              && (vacancies.items.length > vacanciesNumberTablet)
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
            {vacancies.items.slice(0, vacanciesNumberMobile).map((item, index) => (
              <Fragment key={item.data.name[0].text}>
                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                <VacancyPopup item={item} active={popupKey === index} close={popupClose} />
              </Fragment>
            ))}
            {moreVacanciesButtonPresent
              && (vacancies.items.length > vacanciesNumberMobile)
              && (
                <ButtonMore onClick={moreVacancies} />
              )
            }
          </>
        )}
      />

    </VacanciesBlock>
  );
};

VacanciesPrismic.propTypes = {
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
    items: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

VacanciesPrismic.defaultProps = {
  phone: null,
  tablet: null,
  vacanciesNumberDesktop: 6,
  vacanciesNumberTablet: 4,
  vacanciesNumberMobile: 3,
  popupKey: -1,
  moreVacanciesButtonPresent: true,
  vacancies: {},
};

export default VacanciesPrismic;
