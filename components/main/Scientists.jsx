import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Media from 'react-media';
import SciSlider from './SciSlider';
import MainCategory from '../shared/styled/MainCategory';
import MainCategoryLink from '../shared/styled/MainCategoryLink';
import ScientistsSlider from './styled/ScientistsSlider';

const Scientists = ({ sciSlider, phone, tablet }, { t }) => (
  <ScientistsSlider>
    <div className="container">
      <MainCategory>
        {t('Лица')}
      </MainCategory>
      <Link href="/research">
        <MainCategoryLink>
          {t('все научные группы')}
        </MainCategoryLink>
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
  </ScientistsSlider>
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
