import React, { Component } from 'react'

import Search from './Search.jsx'

export default class Layout extends Component {
  render () {
    return (
      <div>
        <h1>Search Spotify</h1>
        <Search />
      </div>
    )
  }
}