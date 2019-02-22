import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const FiltersRequest = ({selectedGroupName,
                        selectedAuthor,
                        pubsearch,
                        resetAuthor,
                        resetGroup,
                        resetSearch
                                            }) => (
    <div className="filters">

        {pubsearch 
        ?   <p>
                {context.t("Запрос пользователя")}
                <Fragment>
                    <span>
                        {pubsearch}
                    </span>
                    <img src="/static/resetFilers.svg" alt="reset filtwers" onClick={e => {resetSearch(e)}}/>
                </Fragment>
            </p>
        :   <div className="group-author">
                {selectedGroupName && 
                    <Fragment>
                        <span>
                            {selectedGroupName} 
                        </span>
                        <img src="/static/resetFilers.svg" alt="reset filtwers" onClick={e => {resetGroup(e)}}/>
                    </Fragment>
                }
                {selectedAuthor && 
                    <Fragment>
                        <span>
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