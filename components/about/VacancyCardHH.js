import React from 'react'
import { ArrowButton } from '../shared/ArrowButton'
import ScrollTop from '../shared/ScrollTop'



class Vacancy extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }


    render() {

        const {item, onClick, cardNumber} = this.props
            
        const words_description = item.snippet.responsibility.split(' ').slice(0, 13).join(' ')
        
        if (item) { 
            return (
            <div className="column is-4-desktop is-6-tablet" ref={this.myRef}>
                <ScrollTop myRef={this.myRef} />
                <div className="vacancy" onClick={e => {onClick(e, cardNumber, this.myRef.current.offsetTop)}}>
                        <h3>
                            {item.name}
                        </h3>
                        <h6>
                            {(item.salary.from !== null) && ("от " + item.salary.from + " руб.")}
                            {(item.salary.to !== null) && ("до " + item.salary.to + " руб.")} 
                        </h6>
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