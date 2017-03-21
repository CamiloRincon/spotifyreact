import React from 'react';
import ReactDOM from 'react-dom';


var stateKey = 'spotify_auth_state';

function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
	q = window.location.hash.substring(1);
	while ( e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

getHashParams();

function generateRandomString (length) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

class LoginForm extends React.Component {
constructor() {
	super();
	
	this.state = {
		data: []
	};
}
	loginSpotify (){
		
		var client_id = '18cee821e6b04c26b967f27138a8ad18';
		var redirect_uri = 'http://localhost:7777/';
		var state = generateRandomString(16);
		
		var scope = 'user-read-private user-read-email';
		var url = 'https://accounts.spotify.com/authorize';

		var params = getHashParams();
		var access_token = params.access_token,
		state = params.state,
		storedState = localStorage.getItem(stateKey);

		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);
		window.location = url;

	}

	render() {
		return(
			<button type="submit" className= "button-spotify" onClick={this.loginSpotify} id="login-button">LOGIN</button>
			);
	}
}
export default LoginForm;