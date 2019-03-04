import React, {Fragment} from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import { ArrowButton } from '../shared/ArrowButton'
import PersonaPopup from './PersonaPopup'
import ScrollTop from '../shared/ScrollTop'



class Persona extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            popup:false, 
            cardoffsetTop: 0
        }
        this.myRef = React.createRef()
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
                    <ScrollTop myRef={this.myRef} />
                    <div className="persona" id="persona">
                        <img className="portrait" src={item.portrait.url} alt={item.people_name + "photo"} onClick={e => {this.handleClick(e)}}/>
                        <div className="name">
                            {RichText.render(item.people_name, PrismicConfig.linkResolver)}
                        </div>
                        <div className="position">
                            {RichText.render(item.position, PrismicConfig.linkResolver)}
                        </div>
                        <Fragment>
                            <div className="button_wrap"> 
                                <ArrowButton color="040303" onClick={e => {this.handleClick(e, this.myRef.current.offsetTop)}} />
                            </div>
                            <div className="people-popup">
                                <PersonaPopup active={this.state.popup} close={this.popupClose} item={item}/>
                            </div>
                        </Fragment>
                    </div>
                </div>
            )
        }
    }

    handleClick = (e, offset) => {
        e.preventDefault()
        this.setState({
            popup:true, 
            cardoffsetTop: offset
        })
        document.body.classList.add('noscroll')



    }
    
    popupClose = (e) => {
        e.preventDefault()
        this.setState({popup:false})
        document.body.classList.remove('noscroll')
        const personaCard = document.getElementById("persona").offsetTop + this.state.cardoffsetTop
        // console.log("persona, popup close", personaCard)
        window.scrollTo({
            top: personaCard, 
            behavior: "smooth"
        })

    }
}

export default Persona