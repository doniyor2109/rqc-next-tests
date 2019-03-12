import React, {Fragment} from 'react'
import Publication from './Publication'

const  PubsSortedByJournal = ({pubs, search}) => (
    <Fragment>
        {pubs.length > 0 && pubs.map((pub, index, pubsArr) => {
            if (index === 0) {
                return  <Fragment key={index}>
                                <h2 className="pub_category">
                                    {pub.data.journal_name[0].text.slice(0,1)} 
                                </h2> 
                                <Publication item={pub} search_text={search}/>
                            </Fragment>
            } else {
                if (pubsArr[index].data.journal_name[0].text.slice(0,1) !== pubsArr[index - 1].data.journal_name[0].text.slice(0,1) ){
                        return  <Fragment key={index}>
                                    <h2 className="pub_category">
                                        {pub.data.journal_name[0].text.slice(0,1)} 
                                    </h2> 
                                    <Publication item={pub} search_text={search}/>
                                </Fragment>
                } else return <Publication item={pub} key={index} search_text={search}/>
            }
    
    
                    
            })
        }
    </Fragment>
)

export default PubsSortedByJournal