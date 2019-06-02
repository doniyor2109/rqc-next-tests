import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import { Title, TeamLead, HR } from './styles/ProjectStyles';

const CourseDescription = ({
  item, first, phone, last,
}, { t }) => (
  <Fragment>
    <div className="column is-5">
      {(first || phone !== null)
      && (
      <Title>
        {t('Курсы')}
      </Title>
      )
      }
      <TeamLead>
        <h1>
          {item.course[0].text}
        </h1>
      </TeamLead>
      <a href={item.schedule.url && item.schedule.url} target="_blank" rel="noopener noreferrer" className="cv">
        {item.file_download_heading[0] && item.file_download_heading[0].text}
      </a>
    </div>

    <div className="column is-7">
      { (first || phone !== null)
        && (
        <Title>
          {t('Научные руководители')}
        </Title>
        )
      }
      <div className="teamleads">
        {RichText.render(item.teamleads, PrismicConfig.linkResolver)}
      </div>
    </div>
    <div className="column is-12">
      {!last && <HR />}
    </div>
  </Fragment>
);

CourseDescription.contextTypes = {
  t: PropTypes.func,
};

CourseDescription.propTypes = {
  item: PropTypes.shape({
    course: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    teamleads: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    schedule: PropTypes.shape({
      url: PropTypes.string,
    }),
    file_download_heading: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
  }),
  first: PropTypes.bool,
  last: PropTypes.bool,
  phone: PropTypes.string,
};

CourseDescription.defaultProps = {
  item: {},
  phone: null,
  first: false,
  last: false,
};


export default CourseDescription;
