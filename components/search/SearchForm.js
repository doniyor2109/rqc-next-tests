import React from 'react'
import Router from 'next/router'

class SearchForm extends React.Component {


    state = {
        searchtext: this.props.initialValue
    }

    render(){
        return(
            <form className="search_form" onSubmit={e => this.handleSubmit(e)}>
                <input type="search" 
                    id="input-search" 
                    name="search" 
                    value={this.state.searchtext}
                    onChange={e => this.handleChange(e)}
                />
                <button type="submit" id="input-submit-button"></button>
            </form>
        )
    }

    handleChange = (e) => {
        this.setState({
            searchtext: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        Router.push('/search?text=' + this.state.searchtext, '/search/' + this.state.searchtext)
    }
}

export default SearchForm