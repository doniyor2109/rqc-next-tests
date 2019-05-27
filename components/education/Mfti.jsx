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
    padding-bottom: 6rem;
    .accordeons {
        margin:6rem 0;
    }
    .description_form {
        margin: 3rem 0;
        font-size: 1.6rem;
        line-height: 2.3rem;
    }
`;

class Mfti extends React.Component {
    static propTypes = {
      text: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      heading: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      mfti_aspirantura: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      mfti_bachelor: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      mfti_magistratura: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      form_call_to_action: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      magistratura: PropTypes.arrayOf(PropTypes.shape({
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
      })),
    }

    static defaultProps = {
      text: [],
      heading: [],
      magistratura: [],
      form_call_to_action: [],
      mfti_aspirantura: [],
      mfti_bachelor: [],
      mfti_magistratura: [],
    }

    constructor(props) {
      super(props);
      this.state = {
        isFormOpened: false,
      };
      this.showForm = this.showForm.bind(this);
    //   this.sendForm = this.sendForm.bind(this);
    }

    showForm() {
      this.setState({
        isFormOpened: true,
      });
    }

    // sendForm() {

    // }

    render() {
      const {
        text, heading, mfti_aspirantura, mfti_bachelor,
        mfti_magistratura, form_call_to_action, magistratura,
      } = this.props;
      const { isFormOpened } = this.state;
      const { t } = this.context;
      return (
        <Section>
          <div className="container">
            <div className="empty" />
            <Institute
              text={text}
              heading={heading}
            />

            <div className="columns">
              <div className="column is-9-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
                <div className="accordeons">
                  <Accordeon
                    title={t('Бакалавриат')}
                    description={mfti_bachelor}
                  />

                  <Accordeon
                    title={t('Магистратура')}
                    description={mfti_magistratura}
                    list={magistratura}
                  />

                  <Accordeon
                    title={t('Аспирантура')}
                    description={mfti_aspirantura}
                  />
                </div>

                <H3>
                  {t('Заявка на поступление')}
                </H3>
                <div className="description_form">
                  {RichText.render(form_call_to_action, PrismicConfig.linkResolver)}
                </div>
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
