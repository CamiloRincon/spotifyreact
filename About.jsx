import React from 'react';
import ReactDOM from 'react-dom';



class About extends React.Component {
	render() {
		return (
			<div>
			<LoginForm />
			</div>
			)
	}
}

var stateKey = 'spotify_auth_state';


function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
	q = window.location.hash.substring(1);
	while ( e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	console.log('que es ',hashParams)
	return hashParams;
}

getHashParams();

var LoginForm = React.createClass({
	getInitialState: function() {
		return {
			data: [],
		};
	},

	generateRandomString: function (length) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},

	loginSpotify: function (){
		
		var client_id = '18cee821e6b04c26b967f27138a8ad18';
		var redirect_uri = 'http://localhost:7777/';
		var state = this.generateRandomString(16);
		localStorage.setItem(stateKey, state);
		var scope = 'user-read-private user-read-email';
		var url = 'https://accounts.spotify.com/authorize';

		var params = getHashParams();
		console.log('aca', params);
		var access_token = params.access_token,
		state = params.state,
		storedState = localStorage.getItem(stateKey);

		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);
		window.location = url;

		if (access_token && (state == null || state !== storedState)) {
			alert('Ocurrio un error durante la Autenticación');
		} else {
			localStorage.removeItem(stateKey);
			if (access_token) {
				$.ajax({
					url: 'https://api.spotify.com/v1/me',
					headers: {
						'Authorization': 'Bearer ' + access_token
					},
					success: function(response) {
						userProfilePlaceholder.innerHTML = userProfileTemplate(response);
						$('#login').hide();
						$('#loggedin').show();
					}
				});
			} else {
				$('#login').show();
				$('#loggedin').hide();
			}

		}

	},
	render: function () {
		return (
			<button onClick={this.loginSpotify} id="login-button" className="btn btn-primary">Login</button>
			);
	}
});

var SearchBox = React.createClass({
	handleCommentSubmit: function(query) {
		fetch(this.props.url + '?q=' + query.artist + '&type=track')
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}

          // Examine the text in the response
          response.json().then(function(data) {
          	this.setState({data: data.tracks.items});
          }.bind(this));
      }.bind(this)
      )
		.catch(function(err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	render: function() {
		return (
			<div className="search-box">
			<SearchForm onCommentSubmit={this.handleCommentSubmit} />
			<SearchResults data={this.state.data} />
			</div>
			);
	}
});

var SearchForm = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		var artist = this.refs.artist.value.trim();
		if (!artist) {
			return;
		}

		this.props.onCommentSubmit({artist: artist});
		this.refs.artist.value = '';
		return;
	},

	render: function() {
		return (
			<form id="search-form" onSubmit={this.handleSubmit}>
			<input type="text" className="form-control" placeholder="Type an Artist Name" ref="artist" autoFocus/>
			<input type="submit" className="btn btn-primary" value="Search"/>
			</form>
			);
	}
});

var SearchResults = React.createClass({

	render: function() {
		var nodes = this.props.data.map(function(album, i) {
			var audio = album.preview_url;
			return(

				<li key={i}>

				<img src={album.album.images[1].url} width={album.album.images[1].width} height={album.album.images[1].height} />
				<audio controls src= {audio}/>

				</li>
				);
		});
		return (
			<ul onMouseOver= {this.dale} onMouseOut={this.dale2} className="search-list list-unstyled" >
			{nodes}
			</ul>

			);
	}
});
export default About;