import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import App from './App.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
// Login con Spotify
(function() {
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
        
        function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };
        /*var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');
            oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');*/
        var params = getHashParams();
        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);
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
              /*$('#login').show();
              $('#loggedin').hide();*/
          }
          document.getElementById('login-button').addEventListener('click', function() {
            var client_id = '18cee821e6b04c26b967f27138a8ad18'; // Tu Client ID
            var redirect_uri = 'http://localhost:7777/'; // Tu Redirect URI (Direccion URL a donde quieres que redireccione luego de iniciar Sesion Con tu cuenta de Spotify.)
            var state = generateRandomString(16);
            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
          }, false);
        }
      })();
ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>

), document.getElementById('app'))

