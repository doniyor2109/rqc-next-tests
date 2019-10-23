import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const Styled = styled.a`
  padding: ${props => (props.mobile ? '2rem 0 0 3rem' : '2rem 0 0 0')};
  width: 203px;
  display: inline-block;
  .big {
    width: 203px;
  }
  .small {
    width: 156px;
  }

  @media (min-width: 320px) and (max-width: 415px){
    .big, .small {
      width: 100%;
    }
  }
`;

const Logo = ({ withSlider, lang, mobile }) => (
  <Link href="/">
    <Styled mobile={mobile}>
      {lang === 'ru'
        ? <img className={withSlider ? 'big' : 'small'} src={withSlider ? '/static/RQClogo_white_ru.svg' : '/static/RQClogo_black_ru.svg'} alt="Логотип Российского Квантового Центра" />
        : <img className={withSlider ? 'big' : 'small'} src={withSlider ? '/static/RQClogo_white_en.svg' : '/static/RQClogo_black_en.svg'} alt="Logo of Russian Quantum Center" />
            }
    </Styled>
  </Link>
);

Logo.propTypes = {
  withSlider: PropTypes.bool,
  lang: PropTypes.string,
  mobile: PropTypes.bool,
};

Logo.defaultProps = {
  withSlider: true,
  lang: 'ru',
  mobile: false,
};

export default Logo;
