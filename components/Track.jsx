import React, { Component } from 'react'

export default class Album extends Component {

  render () {
    return (
      <div className="result">
      	<a href={this.props.url}>
      	<img className="result-img" src={this.props.image} />
        <p>{this.props.name}</p>
        </a>
        <a href={this.props.artists[0].url}><p>{this.props.artists[0].name}</p></a>
       <audio controls src= {this.props.preview}/>
      </div>
    )
  }
}