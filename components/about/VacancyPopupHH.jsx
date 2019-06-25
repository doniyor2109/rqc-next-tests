import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popup from '../shared/Popup';
import VacancyPop from './styled/VacancyPop';

import * as vacanciesActions from '../../redux/actions/vacancies';

class VacancyPopupHH extends React.Component {
  static propTypes = {
    fetchVacancyHH: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool,
    close: PropTypes.func,
    item: PropTypes.shape({
      name: PropTypes.string,
      salary: PropTypes.shape({
        to: PropTypes.number,
        from: PropTypes.number,
      }),
      description: PropTypes.string,
      experience: PropTypes.shape({
        name: PropTypes.string,
      }),
      employment: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    active: false,
    close: () => {},
    item: {},
  }

  componentDidMount() {
    const { fetchVacancyHH, url } = this.props;
    fetchVacancyHH(url);
  }

  createMarkup = markup => ({ __html: markup })

  render() {
    const { item, active, close } = this.props;
    // console.log("HH popup", this.props)
    return (
      <VacancyPop>
        <Popup active={active} close={close}>
          <div className="columns">
            <div className="column is-6-desktop is-offset-1-desktop">

              <div className="vac-title">
                <h3>
                  {item.name}
                </h3>
              </div>
              <hr />
              <div className="description" dangerouslySetInnerHTML={this.createMarkup(item.description)} />
            </div>
            <div className="column is-3-desktop is-offset-1-desktop">
              <h6 className="salary">
                {item.salary
                  ? (
                    <>
                      {item.salary.from ? `от ${item.salary.from} руб.` : ''}
                        &nbsp;
                      {item.salary.to ? `до ${item.salary.to} руб.` : ''}
                    </>
                  )
                  : <b>По результатам собеседования</b>
                }
              </h6>
              <p><b>Опыт работы:</b></p>
              <p>{item.experience && item.experience.name}</p>
              <p style={{ marginTop: '3rem' }}><b>Занятость:</b></p>
              <p>{item.employment && item.employment.name}</p>
              <hr className="final" />
              <p>
                Чтобы откликнуться на вакансию, присылайте резюме,
                а также портфолио или презентацию по выполненным работам на почту
                <br />
                <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
              </p>
            </div>
          </div>
        </Popup>
      </VacancyPop>
    );
  }
}

const mapStateToProps = (state) => {
  const { vacancies } = state;
  return { vacancies };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  vacanciesActions), dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(VacancyPopupHH);
