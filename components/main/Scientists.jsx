import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Media from 'react-media';
import SciSlider from './SciSlider';

const Scientists = ({ sciSlider, phone, tablet }, { t }) => (
  <section className="sci-slider">
    <div className="container">
      <a className="main-category">
        {t('Лица')}
      </a>
      <Link href="/research">
        <a className="main-category-link">
          {t('все научные группы')}
        </a>
      </Link>
      {/* слайдер ученых для десктопа */}
      {sciSlider.length > 0 && (
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null && tablet === null}
          render={() => (
            <SciSlider
              slides={sciSlider}
              desktop
            />
          )}
        />
      )}
      {/* слайдер ученых для Ipad */}
      {sciSlider.length > 0 && (
        <Media
          query="(min-width: 416px) and (max-width: 769px)"
          defaultMatches={tablet !== null}
          render={() => (
            <SciSlider
              slides={sciSlider}
              ipad
            />
          )
       }
        />
      )
      }
      {/* слайдер ученых для смартфона */}
      {sciSlider.length > 0 && (
        <Media
          query="(max-width: 415px)"
          defaultMatches={phone !== null}
          render={() => (
            <SciSlider
              slides={sciSlider}
              iphone
            />
          )
       }
        />
      )
      }
    </div>
  </section>
);

Scientists.propTypes = {
  sciSlider: PropTypes.arrayOf(PropTypes.shape({})),
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

Scientists.defaultProps = {
  sciSlider: [],
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

Scientists.contextTypes = {
  t: PropTypes.func,
};

export default Scientists;
