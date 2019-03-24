import React from 'react'

import ResultPeople from './ResultPeople'
import ResultTeam from './ResultTeam'
import ResultTeamLeader from './ResultTeamLeader'
import ResultArticle from './ResultArticle'
import ResultEvent from './ResultEvent'
import ResultVacancy from './ResultVacancy'
import ResultPhoto from './ResultPhoto'
import ResultVideo from './ResultVideo'
import Publication from '../publications/Publication'


const Results = ({result, search_text, index}) => {
    if (result) {
        switch (result.type) {
            case "publication": 
            return <Publication item={result} 
                                key={index} 
                                search_text={search_text}
                                search_page={true}
                    />
            case "people": 
                return <ResultPeople item={result} 
                                     key={index} 
                                     search_text={search_text}
                        />
            case "science_group": 
                return <ResultTeam item={result} 
                                   key={index} 
                                   search_text={search_text}
                        />
            case "news": 
                return <ResultArticle item={result} 
                                      key={index} 
                                      search_text={search_text}
                        />
            case "event": 
            return <ResultEvent item={result} 
                                key={index} 
                                search_text={search_text}
                    />
            case "vacancy": 
            return <ResultVacancy  item={result} 
                                   key={index} 
                                   search_text={search_text}
                    />
            case "mediakit_photo_gallery": 
            return <ResultPhoto item={result} 
                                key={index} 
                                search_text={search_text}
                    />
            case "mediakit_video": 
            return <ResultVideo item={result} 
                                key={index} 
                                search_text={search_text}
                    />
            case "scientist": 
            return <ResultTeamLeader item={result} 
                                     key={index} 
                                     search_text={search_text}
                    />
            default:
            return null
        }
    }
}

export default Results