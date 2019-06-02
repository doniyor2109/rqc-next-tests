import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'unfetch';
import MaskedInput from 'react-text-mask';
import Popup from '../shared/Popup';
import H3 from '../shared/styled/H3';
import Form from './styles/Form';
import Loading from '../shared/loading';
import SendingStatus from './SendingStatus';

class FormPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStepen: '',
      name: '',
      email: '',
      phone: '',
      vuz: '',
      faculty: '',
      subject: '',
      teamlead: '',
      additional: '',
      nameError: false,
      emailError: false,
      phoneError: false,
      vuzError: false,
      facultyError: false,
      isSending: false,
      isSentOK: false,
      isSentError: false,
    };
    this.handleStepen = this.handleStepen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.stepenSelect = React.createRef();
    this.inputname = React.createRef();
    this.inputphone = React.createRef();
    this.inputemail = React.createRef();
    this.inputvuz = React.createRef();
    this.inputfaculty = React.createRef();
  }

  onKeydown(event) {
    const stateField = `${event.currentTarget.name}Error`;
    this.setState({
      [stateField]: false,
    });
  }

  handleSubmit(event) {
    const {
      nameError, emailError, phoneError, vuzError, facultyError, selectedStepen,
    } = this.state;

    const data = new FormData(event.target);
    data.set('stepen', selectedStepen);
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const vuz = data.get('vuz');
    const faculty = data.get('faculty');
    if (name === '') {
      this.inputname.current.placeholder = 'Введите имя!';
      this.setState({
        nameError: true,
      });
    }
    console.log('email', event.target.elements.email.checkValidity())
    if (!event.target.elements.email.checkValidity()) {
      this.inputemail.current.placeholder = 'Неверный E-mail!';
      this.setState({
        emailError: true,
      });
    }
    if (phone === '') {
      this.inputphone.current.inputElement.placeholder = 'Неверный номер телефона!';
      this.setState({
        phoneError: true,
      });
    }
    if (vuz === '') {
      this.inputvuz.current.placeholder = 'Введите название ВУЗа!';
      this.setState({
        vuzError: true,
      });
    }
    if (faculty === '') {
      this.inputfaculty.current.placeholder = 'Введите название факультета!';
      this.setState({
        facultyError: true,
      });
    }

    if (event.target.checkValidity()) {
      this.setState({
        isSending: true,
      });
      fetch('/sendmail', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.status === 200) {
          this.setState({
            isSending: false,
            isSentOK: true,
          });
        }
        if (response.status === 500) {
          this.setState({
            isSending: false,
            isSentError: true,
          });
        }
      });
    }
    event.preventDefault();
  }

  handleStepen(stepen) {
    this.setState({
      selectedStepen: stepen.value,
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { close, active } = this.props;
    const {
      name, email, phone, vuz, faculty, subject, teamlead, additional,
      nameError, emailError, phoneError, vuzError, facultyError,
      isSending, isSentOK, isSentError,
    } = this.state;
    const { t } = this.context;
    const stepenOptions = [
      { value: t('Бакалавриат (открытие в 2020 г)'), label: t('Бакалавриат (открытие в 2020 г)'), isDisabled: true },
      { value: t('Магистратура'), label: t('Магистратура') },
      { value: t('Аспирантура (открытие в 2020 г)'), label: t('Аспирантура (открытие в 2020 г)'), isDisabled: true },
    ];
    return (
      <Form>
        <Popup close={close} active={active}>
          {isSending && <Loading />}
          {isSentOK && <SendingStatus text={t('Заявка принята, спасибо!')} />}
          {isSentError && <SendingStatus text={t('Что-то пошло не так, попробуйте еще раз')} />}
          {!isSending && !isSentOK && !isSentError
              && (
              <Fragment>
                <H3>
                  {t('Заявка на поступление')}
                </H3>
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="select_wrapper">
                    <p className="name">
                      {t('Степень обучения')}
                    :
                    </p>
                    <Select
                      onChange={this.handleStepen}
                      options={stepenOptions}
                      instanceId="select-stepen"
                      className="select-container"
                      classNamePrefix="select"
                      placeholder={t('Выберите из списка...')}
                      ref={this.stepenSelect}
                      isOptionDisabled={option => option.isDisabled === true}
                    />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.handleInputChange}
                    className={nameError ? 'fullwidth error' : 'fullwidth'}
                    placeholder={t('Имя Фамилия Отчество')}
                    ref={this.inputname}
                    onKeyDown={this.onKeydown}
                    required
                  />
                  <div className="halfwidth_wrapper">
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={this.handleInputChange}
                      className={emailError ? 'halfwidth error' : 'halfwidth'}
                      placeholder="E-mail*"
                      ref={this.inputemail}
                      onKeyDown={this.onKeydown}
                      required
                    />
                    <MaskedInput
                      mask={['+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                      name="phone"
                      type="text"
                      value={phone}
                      onChange={this.handleInputChange}
                      className={phoneError ? 'halfwidth error' : 'halfwidth'}
                      placeholder={t('Телефон*')}
                      ref={this.inputphone}
                      onKeyDown={this.onKeydown}
                      required
                    />
                  </div>
                  <input
                    name="vuz"
                    type="text"
                    value={vuz}
                    onChange={this.handleInputChange}
                    className={vuzError ? 'fullwidth error' : 'fullwidth'}
                    placeholder={t('ВУЗ*')}
                    ref={this.inputvuz}
                    onKeyDown={this.onKeydown}
                    required
                  />
                  <input
                    name="faculty"
                    type="text"
                    value={faculty}
                    onChange={this.handleInputChange}
                    className={facultyError ? 'fullwidth error' : 'fullwidth'}
                    placeholder={t('Факультет*')}
                    ref={this.inputfaculty}
                    onKeyDown={this.onKeydown}
                    required
                  />
                  <p className="details">
                    {t('Если вам интересно определенное направление работы РКЦ, укажите это направление и научного руководителя, к которому вы хотели бы попасть')}
                  :
                  </p>
                  <input
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={this.handleInputChange}
                    className="fullwidth"
                    placeholder={t('Направление работы')}
                  />
                  <input
                    name="teamlead"
                    type="text"
                    value={teamlead}
                    onChange={this.handleInputChange}
                    className="fullwidth"
                    placeholder={t('Научный руководитель')}
                  />
                  <p className="details">
                    {t('Дополнительные сведения, которые вы хотите сообщить о себе')}
                  :
                  </p>
                  <textarea
                    value={additional}
                    onChange={this.handleInputChange}
                    className="fullwidth"
                    name="additional"
                  />
                  <div className="halfwidth_wrapper">
                    <p className="mark">
                      {t('* — Вопросы, обязательные для заполнения')}
                    </p>
                    <button type="submit" className="form-submit">
                      {t('Отправить')}
                    </button>
                  </div>
                  {(nameError || emailError || phoneError || vuzError || facultyError)
                && (
                <div className="error">
                  {t('Проверьте корректность заполнения формы!')}
                </div>
                )
                }
                </form>
              </Fragment>
              )
            }
        </Popup>
      </Form>
    );
  }
}

FormPopup.contextTypes = {
  t: PropTypes.func,
};

export default FormPopup;
