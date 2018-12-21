import React from 'react'
import { CardLarge } from './CardLarge.js'
import { CardSmall } from './CardSmall.js'
import { Loading } from '../shared/loading.js'


// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewTablet = ({ events, isFetching }) => {
  if (isFetching) return <Loading /> 
  else return (
  <div className="columns is-multiline">
    {events.map((item, index) => {
              if (index === 0 || index === 5) {
                return <CardLarge item={item} key={index} tablet/>
              } else return <CardSmall item={item} key={index} tablet/>
            })}
  </div>
  )
}

export default GridViewTablet