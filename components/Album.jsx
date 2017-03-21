import React, { Component } from 'react'

export default class Album extends Component {
	render () {
		return (
			<div className="result">
				<a href={this.props.url}>
					<img className="result-img" src={this.props.image} />
					<p>{this.props.name}</p>
				</a>
			</div>
			)
	}
}