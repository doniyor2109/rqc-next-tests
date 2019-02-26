import React, {Fragment} from 'react'
import Publication from './Publication'

const  PubsSortedByJournal = ({pubs}) => (
    <Fragment>
        {pubs.length > 0 && pubs.map((pub, index, pubsArr) => {
            if (index === 0) {
                return  <Fragment key={index}>
                                <h2 className="pub_category">
                                    {pub.data.journal_name[0].text.slice(0,1)} 
                                </h2> 
                                <Publication pub={pub} />
                            </Fragment>
            } else {
                if (pubsArr[index].data.journal_name[0].text.slice(0,1) !== pubsArr[index - 1].data.journal_name[0].text.slice(0,1) ){
                        return  <Fragment key={index}>
                                    <h2 className="pub_category">
                                        {pub.data.journal_name[0].text.slice(0,1)} 
                                    </h2> 
                                    <Publication pub={pub} />
                                </Fragment>
                } else return <Publication pub={pub} key={index} />
            }
    
    
                    
            })
        }
    </Fragment>
)

export default PubsSortedByJournal