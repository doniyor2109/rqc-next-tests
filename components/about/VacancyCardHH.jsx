import React from 'react';
import PropTypes from 'prop-types';
import ArrowButton from '../shared/ArrowButton';
import ScrollTop from '../shared/ScrollTop';
import Card from './styled/Card';

class VacancyCardHH extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleClick = () => {
    const { cardNumber, onClick } = this.props;
    onClick(cardNumber, this.myRef.current.offsetTop);
  }

  render() {
    const { item } = this.props;
    const wordsDescription = item.snippet.responsibility.split(' ').slice(0, 13).join(' ');
    // console.log('vacancy', item);
    return (
      <div className="column is-4-desktop is-6-tablet" ref={this.myRef}>
        <ScrollTop myRef={this.myRef} />
        <Card
          onClick={this.handleClick}
          role="button"
          tabIndex="0"
        >
          <h3>
            {item.name}
          </h3>
          <h6>
            {item.salary
              ? (
                <>
                  {item.salary.from ? `от ${item.salary.from} руб.` : ''}
                &nbsp;
                  {item.salary.to ? `до ${item.salary.to} руб.` : ''}
                </>
              )
              : 'По результатам собеседования'
            }
          </h6>
          <div className="description_teaser">
            {`${wordsDescription}...`}
          </div>
          <ArrowButton color="040303" />
        </Card>
      </div>
    );
  }
}

VacancyCardHH.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    salary: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
    }),
  }),
  onClick: PropTypes.func.isRequired,
  cardNumber: PropTypes.number,
};

VacancyCardHH.defaultProps = {
  item: {},
  cardNumber: -1,
};


export default VacancyCardHH;
