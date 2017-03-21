import React, { Component } from 'react'

export default class Artist extends Component {
	render () {
		return (
			<div className="result">
				<a href={this.props.url}><img className="result-img" src={this.props.image} />
					<p>{this.props.name}</p>
					<p className="followers">{this.props.followers} followers</p>
				</a>
			</div>
			)
	}
}