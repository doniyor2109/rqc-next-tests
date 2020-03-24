import React from 'react'
import PropTypes from 'prop-types'
import SciCard from './SciCard'
import MainCategory from '../shared/styled/MainCategory'

const Groups = ({ groups }, { t }) => (
  <section className="groups">
    <div id="groups" className="container">
      <MainCategory>{t('Научные группы')}</MainCategory>
      <div className="columns is-multiline">
        {groups.map(group => (
          <SciCard group={group} key={group.id} />
        ))}
      </div>
    </div>
  </section>
)

Groups.contextTypes = { t: PropTypes.func }

export default Groups
