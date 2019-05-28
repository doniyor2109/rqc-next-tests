import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import Popup from '../shared/Popup';
import H3 from '../shared/styled/H3';

const Form = styled.div`

`;


class FormPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStepen: '',
    };
    this.handleStepen = this.handleStepen.bind(this);
  }

  handleStepen(stepen) {
    this.setState({
      selectedStepen: stepen.value,
    });
  }

  render() {
    const { close, active } = this.props;
    const { selectedStepen } = this.state;
    const { t } = this.context;
    return (
      <Form>
        <Popup close={close} active={active}>
          <H3>
            {t('Заявка на поступление')}
          </H3>
          <form>
            <div className="select_wrapper">
              <p className="name">
                {t('Степень обучения')}
                :
              </p>
              <Select
                onChange={this.handleStepen}
                options={filteredGroups.map(
                  group => ({ label: group, value: group }),
                )}
                instanceId="select-stepen"
                className="stepen-container"
                classNamePrefix="select"
                placeholder={t('Выберите из списка...')}
                ref={this.groupSelect}
              />
            </div>
          </form>
        </Popup>
      </Form>
    );
  }
}

FormPopup.propTypes = {

};

export default FormPopup;
