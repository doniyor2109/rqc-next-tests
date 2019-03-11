import React, {Fragment} from 'react'
import Publication from './Publication'
import ResultPublication from '../search/ResultPublication'

const  PubsSortedByDate = ({pubs, search}) => {
    return (
        <Fragment>
            {pubs.length > 0 && pubs.map((pub, index, pubsArr) => {
                if (index === 0) {
                    return  <Fragment key={index}>
                                    <h2 className="pub_category">
                                        {pubsArr[index].data.date.slice(0,4)} 
                                    </h2> 
                                    {search.length > 0
                                    ? <ResultPublication item={pub} search_text={search} />
                                    : <Publication pub={pub} />
                                    }
                                </Fragment>
                } else {
                    if (pubsArr[index].data.date.slice(0,4) !== pubsArr[index - 1].data.date.slice(0,4) ){
                            return  <Fragment key={index}>
                                        <h2 className="pub_category">
                                            {pubsArr[index].data.date.slice(0,4)} 
                                        </h2> 
                                        {search.length > 0
                                        ? <ResultPublication item={pub} search_text={search} />
                                        : <Publication pub={pub} />
                                        }
                                    </Fragment>
                    } else return   <Fragment key={index}>
                                        {search.length > 0
                                            ? <ResultPublication item={pub} search_text={search} />
                                            : <Publication pub={pub} />
                                            }
                                    </Fragment>
                    
                }      
            })}
        </Fragment>
    )
}

export default PubsSortedByDate