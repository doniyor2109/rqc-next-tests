/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ArrowButton from '../shared/ArrowButton';
import MainCategoryLink from '../shared/styled/MainCategoryLink';
import AnnualReports from './AnnualReports';
import H3 from '../shared/styled/H3';
import StyledReportsAndMedia from './styled/StyledReportsAndMedia';

const ReportsAndMedia = ({ page }, { t }) => (
  <StyledReportsAndMedia>
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile" />
        <div className="column is-12-mobile is-8-tablet is-6-desktop">
          <H3>
            {t('Годовые отчеты')}
          </H3>
          <Link href="/reports">
            <a>
              <MainCategoryLink style={{ marginRight: '1.5rem' }}>
                {t('смотреть все')}
              </MainCategoryLink>
            </a>
          </Link>
          {page.data && <AnnualReports slides={page.data.body1[0].items} /> }
        </div>
        <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile" />
        <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile" />
        <div className="column is-6-desktop is-8-tablet">
          <div className="media-kit-teaser">
            <Link href="/mediakit">
              <a>
                <div className="title">
                  {t('Медиакит RQC')}
                </div>
                <div className="description">
                  {t('Фотографии, видео материалы и презентации Российского квантового центра')}
                </div>
                <ArrowButton color="ffffff" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </StyledReportsAndMedia>
);

ReportsAndMedia.contextTypes = {
  t: PropTypes.func,
};

ReportsAndMedia.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.shape({
      body1: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape()),
      })),
    }),
  }),
};

ReportsAndMedia.defaultProps = {
  page: {},
};

export default ReportsAndMedia;
