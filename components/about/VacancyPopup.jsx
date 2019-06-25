import React from 'react';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import Popup from '../shared/Popup';
import PrismicConfig from '../../prismic-configuration';

const VacancyPopup = ({ item, active, close }, { t }) => (
  <Popup active={active} close={close}>
    <div className="columns">
      <div className="column is-6-desktop is-offset-1-desktop">
        <div className="vac-title">
          {RichText.render(item.data.name, PrismicConfig.linkResolver)}
        </div>
        <hr />
        <p>
          <b>
            {t('Обязанности')}
            :
          </b>

        </p>
        {RichText.render(item.data.todo, PrismicConfig.linkResolver)}
        <p>
          <b>
            {t('Требования')}
            :
          </b>

        </p>
        {RichText.render(item.data.requirements, PrismicConfig.linkResolver)}
        <p>
          <b>
            {t('Условия')}
            :
          </b>

        </p>
        {RichText.render(item.data.conditions, PrismicConfig.linkResolver)}
        <p>
          <b>
            {t('Приветствуется')}
            :
          </b>
        </p>
        {RichText.render(item.data.good_to_know, PrismicConfig.linkResolver)}
      </div>
      <div className="column is-3-desktop is-offset-1-desktop">
        <hr className="salary" />
        {RichText.render(item.data.salary, PrismicConfig.linkResolver)}
        <hr />
        <p>
          <b>
            {t('Опыт работы')}
            :
          </b>
        </p>
        {RichText.render(item.data.experience, PrismicConfig.linkResolver)}
        <p style={{ marginTop: '3rem' }}>
          <b>
            {t('Занятость')}
            :
          </b>
        </p>
        {RichText.render(item.data.time, PrismicConfig.linkResolver)}
        <hr className="final" />
        <p>
          {t('Чтобы откликнуться на вакансию, присылайте резюме, а также портфолио или презентацию по выполненным работам на почту')}
           :
          <br />
          <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
        </p>
      </div>
    </div>
  </Popup>
);

VacancyPopup.contextTypes = {
  t: PropTypes.func,
};

export default VacancyPopup;
