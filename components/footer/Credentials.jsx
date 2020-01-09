import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

const Copyright = styled.div`
  margin-top: -3rem;
  p {
    color: white;
    font-size: 1rem;
    line-height: 1.7rem;
  }
`

const HR = styled.hr`
  background: rgba(255, 255, 255, 0.5);
  height: 1px;
  margin: 0;
  padding: 0;
`

const Credentials = (props, { t }) => (
  <Fragment>
    <div className="column is-2-desktop is-2-tablet is-6-mobile">
      <Copyright>
        <p>
          &copy;2010-
          {moment(Date.now()).format('YYYY')}
        </p>
        <p>{t('Российский Квантовый Центр')}</p>
      </Copyright>
    </div>
    <div className="column is-10-desktop is-10-tablet is-6-mobile">
      <HR />
    </div>
  </Fragment>
)

Credentials.contextTypes = {
  t: PropTypes.func,
}

export default Credentials
