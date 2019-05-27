/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import Institute from './Institute';
import Accordeon from './Accordeon';
import H3 from '../shared/styled/H3';
import CallToActionButton from '../shared/CallToActionButton';
import Form from './Form';

const Section = styled.section`
    background: #F7F9FB;
`;

class Mfti extends React.Component {
    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
        isFormOpened: false,
      };
      this.showForm = this.showForm.bind(this);
      this.sendForm = this.sendForm.bind(this);
    }

    showForm() {
      this.setState({
        isFormOpened: true,
      });
    }

    sendForm() {

    }

    render() {
      const {
        text, heading, mfti_aspirantura, mfti_bachelor, mfti_magistratura, form_call_to_action,
      } = this.props;
      const { isFormOpened } = this.state;
      const { t } = this.context;
      return (
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
                  complexContent
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

            <div className="columns">
              <div className="column is-3-desktop is-offset-1-desktop is-4-tablet is-12-mobile">
                <CallToActionButton text={t('Подать заявку')} onClick={this.showForm} />
                {isFormOpened && <Form send={this.sendForm} />}
              </div>
            </div>
          </div>
        </Section>
      );
    }
}


Mfti.contextTypes = {
  t: PropTypes.func,
};

export default Mfti;
