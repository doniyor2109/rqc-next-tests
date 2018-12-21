import React  from 'react'
import { CardLarge } from './CardLarge.js'
import { CardSmall } from './CardSmall.js'
import { Loading } from '../shared/loading.js'


// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewDesktop = ({ events, isFetching }) => {

      if (isFetching) return <Loading /> 
      else return (
        <div className="columns is-multiline">
          {events.map((item, index) => {
                    if (index === 0) {
                      return <CardLarge item={item} key={index} desktop/>
                    } else return <CardSmall item={item} key={index} desktop/>
                  })}
        </div>
      )
}

export default GridViewDesktop