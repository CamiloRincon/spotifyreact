import React, { Component } from 'react'

import ResultsContainer from './ResultsContainer.jsx'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = { query: '', data: {}, inputCleared: false }
  }

  handleChange (event) {
    const query = event.target.value.trim().toLowerCase()

    if (this.state.query === query) {
      return
    }

    this.setState({ query })
    this.submitSearch(query)
  }

  submitSearch (keyword) {
    if (!keyword.length > 0) {
      this.setState({ data: {}, inputCleared: true })
      return
    }

    this.setState({ inputCleared: false })

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=album,artist,track`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        if (this.state.inputCleared || !data || keyword !== this.state.query) {
          return
        }
        this.setState({ data })
      })
  }

  render () {
    return (
      <div>
        <div className="search-container">
          <input type="text" className="search-bar" onChange={this.handleChange.bind(this)} />
        </div>
        <div className="content">
          <ResultsContainer data={this.state.data} />
        </div>
      </div>
    )
  }
}