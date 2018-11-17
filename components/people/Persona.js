import React, {Fragment} from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import { ArrowButton } from '../shared/ArrowButton'
import PersonaPopup from './PersonaPopup'

class Persona extends React.Component {

    state = {
        popup:false
    }

    render () {

        const { item } = this.props

        var hasWebsite = false
        if (item) {

            // проверяем есть ли у персоны персональный сайт
            if (item.website) {
                hasWebsite = typeof item.website.url !== 'undefined'
            }
            return (

                // презентационный компонент 
                <div className="column is-3-desktop is-4-tablet">
                    <div className="persona">
                        <img className="portrait" src={item.portrait.url} alt={item.people_name + "photo"} onClick={e => {this.handleClick(e)}}/>
                        <div className="name">
                            {RichText.render(item.people_name, PrismicConfig.linkResolver)}
                        </div>
                        <div className="position">
                            {RichText.render(item.position, PrismicConfig.linkResolver)}
                        </div>
                        {((item.titles.length > 2) || (item.awards.length > 0) || hasWebsite)
                        &&
                            <Fragment>
                                <div className="button_wrap"> 
                                    <ArrowButton color="040303" onClick={e => {this.handleClick(e)}} />
                                </div>
                                <div className="people-popup">
                                    <PersonaPopup active={this.state.popup} close={this.popupClose} item={item}/>
                                </div>
                            </Fragment>
                        }
                    </div>
                </div>
            )
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        this.setState({popup:true})
        document.body.classList.add('noscroll')

    }
    
    popupClose = (e) => {
        e.preventDefault()
        this.setState({popup:false})
        document.body.classList.remove('noscroll')

    }
}

export default Persona