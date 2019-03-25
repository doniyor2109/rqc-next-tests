import React from 'react';
import PropTypes from 'prop-types';

const Popup = ({
  active, close, className, children,
}) => (

  // компонент popup, чтобы кнопка закрытия окна работала ему нужно передать
  // в props фунцкию close(), которая в родительском компоненте через state будет отвечать
  // за закрытие окна
  <div className={className}>
    <div className={active ? 'modal is-active' : 'modal'}>
      <div className="modal-background" onClick={e => close(e)} role="button" tabIndex={0} />
      <div className="modal-content">
        {children}
        <button className="modal-close is-large" aria-label="close" onClick={e => close(e)} type="button" />
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Popup.defaultProps = {
  active: false,
  className: '',
};

export default Popup;
