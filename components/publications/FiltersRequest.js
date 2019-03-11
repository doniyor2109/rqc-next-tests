import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const FiltersRequest = ({selectedGroupName,
                        selectedAuthor,
                        pubsearch,
                        resetAuthor,
                        resetGroup,
                        resetSearch
                                            }, context) => (
    <div className="filters">

        {pubsearch 
        ?   <div className="group-author">
                <Fragment>
                    <span className="description"> 
                        {context.t("Результаты по запросу")}:
                    </span>
                    <span className="filter-name">
                        {pubsearch}
                    </span>
                    <img src="/static/resetFilers.svg" alt="reset filtwers" onClick={e => {resetSearch(e)}}/>
                </Fragment>
            </div>
        :   <div className="group-author">
                {selectedGroupName && 
                    <Fragment>
                        <span className="filter-name">
                            {selectedGroupName} 
                        </span>
                        <img src="/static/resetFilers.svg" alt="reset filtwers" onClick={e => {resetGroup(e)}}/>
                    </Fragment>
                }
                {selectedAuthor && 
                    <Fragment>
                        <span className="filter-name">
                            {selectedAuthor} 
                        </span>
                        <img src="/static/resetFilers.svg" alt="reset filtwers" onClick={e => {resetAuthor(e)}}/>
                    </Fragment>
                }
            </div>
        }
    </div>
)

FiltersRequest.contextTypes = {
    t: PropTypes.func
}

export default FiltersRequest