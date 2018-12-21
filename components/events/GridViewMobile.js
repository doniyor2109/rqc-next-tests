import React from 'react'
import { CardSmall } from './CardSmall.js'
import { Loading } from '../shared/loading.js'


// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewMobile = ({ events, isFetching }) => {
  if (isFetching) return <Loading /> 
  else return (
  <div className="columns is-multiline">
    {events.map((item, index) => <CardSmall item={item} key={index} mobile/>)}
  </div>
  )
}

export default GridViewMobile