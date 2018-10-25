import React from 'react'
import { NewscardLarge } from './NewscardLarge.js'
import { NewscardMedium } from './NewscardMedium.js'
import { NewscardSmall } from './NewscardSmall.js'
import { Loading } from '../shared/loading.js'


// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewTablet = ({ news, isFetching }) => {
  if (isFetching) return <Loading /> 
  else return (
  <div className="columns is-multiline">
    {news.map((item, index) => {
              if (index === 0 || index === 5) {
                return <NewscardLarge article={item} key={index} />
              } else if (index === 1 || index === 2) {
                return <NewscardMedium article={item} key={index} />
              } else if (index === 3 || index === 4 || index === 6 || index === 7 || index === 8 || index === 9) {
                return <NewscardSmall article={item} key={index} />
              } else return <NewscardSmall article={item} key={index} />
            })}
  </div>
  )
}

export default GridViewTablet