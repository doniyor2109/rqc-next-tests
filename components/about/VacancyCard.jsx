import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import ArrowButton from '../shared/ArrowButton';
import PrismicConfig from '../../prismic-configuration';
import ScrollTop from '../shared/ScrollTop';
import Card from './styled/Card';

class VacancyCard extends React.Component {
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
    const wordsDescription = item.data.todo[0].text.split(' ').slice(0, 10).join(' ');
    return (
      <div className="column is-4-desktop is-6-tablet" ref={this.myRef}>
        <ScrollTop myRef={this.myRef} />
        <Card
          onClick={this.handleClick}
        >
          {RichText.render(item.data.name, PrismicConfig.linkResolver)}
          {RichText.render(item.data.salary, PrismicConfig.linkResolver)}
          <div className="description_teaser">
            {`${wordsDescription}...`}
          </div>
          <ArrowButton color="040303" />
        </Card>
      </div>
    );
  }
}

VacancyCard.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      salary: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  }),
  onClick: PropTypes.func.isRequired,
  cardNumber: PropTypes.number,
};

VacancyCard.defaultProps = {
  item: {},
  cardNumber: -1,
};


export default VacancyCard;
