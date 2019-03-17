import React from 'react';
import PropTypes from 'prop-types';

const NoPubs = ({ resetAll }, { t }) => (
  <div className="no_pubs">
    <p>
      {t('По вашему запросу не найдено ни одной публикации')}
    </p>
    {t('Посмотрите список ')}
    <button onClick={e => resetAll(e)} type="button">
      {t('всех публикаций')}
    </button>
    {t(' или используйте фильтры для выбора публикаций определенного автора или научной группы')}
  </div>
);

NoPubs.propTypes = {
  resetAll: PropTypes.func.isRequired,
};

NoPubs.contextTypes = {
  t: PropTypes.func,
};

export default NoPubs;
