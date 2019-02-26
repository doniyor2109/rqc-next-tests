import React, {Fragment} from 'react'
import Publication from './Publication'

const  PubsSortedByDate = ({pubs}) => (
    <Fragment>
        {pubs.length > 0 && pubs.map((pub, index, pubsArr) => {
            if (index === 0) {
                return  <Fragment key={index}>
                                <h2 className="pub_category">
                                    {pubsArr[index].data.date.slice(0,4)} 
                                </h2> 
                                <Publication pub={pub} />
                            </Fragment>
            } else {
                if (pubsArr[index].data.date.slice(0,4) !== pubsArr[index - 1].data.date.slice(0,4) ){
                        return  <Fragment key={index}>
                                    <h2 className="pub_category">
                                        {pubsArr[index].data.date.slice(0,4)} 
                                    </h2> 
                                    <Publication pub={pub} />
                                </Fragment>
                } else return <Publication pub={pub} key={index} />
            }
    
    
                    
            })
        }
    </Fragment>
)

export default PubsSortedByDate