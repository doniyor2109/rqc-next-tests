/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import Institute from './Institute';
import Accordeon from './Accordeon';
import H3 from '../shared/styled/H3';

const Section = styled.section`
    background: #F7F9FB;
`;

const Mfti = ({
  text, heading, mfti_aspirantura, mfti_bachelor, mfti_magistratura, form_call_to_action,
}, { t }) => (
  <Section>
    <div className="container">

      <Institute
        text={text}
        heading={heading}
      />

      <div className="columns">
        <div className="column is-9-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
          <Accordeon
            title={t('Бакалавриат')}
            content={mfti_bachelor}
          />

          <Accordeon
            title={t('Магистратура')}
            content={mfti_magistratura}
          />

          <Accordeon
            title={t('Аспирантура')}
            content={mfti_aspirantura}
          />

          <H3>
            {t('Заявка на поступление')}
          </H3>
          {RichText.render(form_call_to_action, PrismicConfig.linkResolver)}
        </div>
      </div>
    </div>
  </Section>
);

Mfti.contextTypes = {
  t: PropTypes.func,
};

export default Mfti;
