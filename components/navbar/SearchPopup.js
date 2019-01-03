import React from 'react'
import Popup from '../shared/Popup'
import PropTypes from 'prop-types'
import Router from 'next/router'
import '../../scss/searchPopup.scss'


class SearchPopup extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        value: ''
    }

    render() {
        const {active, close} = this.props
        return (
            <Popup active={active} close={close}>
                <div className="container">
                    <div className="columns">
                        <div className="column is-3-desktop">
                        </div>
                        <div className="column is-6-desktop">
                            <form className="search_form" onSubmit={e => {this.handleSubmit(e); close(e)}}>
                                <input type="search" 
                                    id="site-search" 
                                    name="search" 
                                    placeholder={this.context.t("Напишите ваш запрос")}
                                    value={this.state.value}
                                    onChange={e => this.handleChange(e)}
                                />
                                <button type="submit" id="submit-button"></button>
                            </form>
                        </div>

                    </div>
                </div>


            </Popup>
        )
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.value.length) {
            Router.push('/search?text=' + this.state.value, '/search/' + this.state.value)
        }
    }

    
}



export default SearchPopup