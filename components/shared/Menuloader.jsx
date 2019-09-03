import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as menuActions from '../../redux/actions/menu';

class Menuloader extends Component {
    static propTypes = {
    }

    componentDidMount() {
      const { lang, fetchMenu } = this.props;
      fetchMenu(lang);
    }

    componentDidUpdate(prevProps) {
      const { lang, fetchMenu } = this.props;
      if (prevProps.lang !== lang) {
        fetchMenu(lang);
      }
    }

    render() {
      return (
        <div />
      );
    }
}

Menuloader.propTypes = {
  lang: PropTypes.string,
  fetchMenu: PropTypes.func.isRequired,
};

Menuloader.defaultProps = {
  lang: 'ru',
};


const mapStateToProps = (state) => {
  const { menu } = state;
  const { lang } = state.i18nState;
  return { menu, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, menuActions),
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Menuloader);
