import React from 'react'
import { ArrowButton } from '../shared/ArrowButton'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ScrollTop from '../shared/ScrollTop'



class Vacancy extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }


    render() {

        const {item, onClick, cardNumber} = this.props
            
        const words_description = item.data.todo[0].text.split(' ').slice(0, 10).join(' ')
        
        if (item) { 
            return (
            <div className="column is-4-desktop is-6-tablet" ref={this.myRef}>
                <ScrollTop myRef={this.myRef} />
                <div className="vacancy" onClick={e => {onClick(e, cardNumber, this.myRef.current.offsetTop)}}>
                        {RichText.render(item.data.name, PrismicConfig.linkResolver)}
                        {RichText.render(item.data.salary, PrismicConfig.linkResolver)}
                        <div className="description_teaser">
                            {words_description + "..."}
                        </div>
                        <ArrowButton color="040303" />
                </div>
            </div>
            )
        }
    }

} 



export default Vacancy