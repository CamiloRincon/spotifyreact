import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile.jsx';
import LoginForm from './Login.jsx';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

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


class Home extends React.Component {
   render() {
    var result = false
    var params = getHashParams();
    var access_token = params.access_token;

    if(access_token) {
        result = true;

    }

    console.log(access_token, 'access');
    return (
        <div> {result ? (<Profile/>) : null}
        <div className="main-container">
        
        <h1> Welcome to my spotify App </h1>
        <p> You can get access to your personal lists</p>
        <p> You can search any song, album or artist</p>
        <p> Just enjoy it!! </p>
        <p> In case you want to listen the whole song or know or about an artist or playlist</p>
        <p> click'n you'll be redirect to spotify</p>
        <Link to="/search" className= "button-spotify" >SEARCH MUSIC</Link>
        {result ? null : <LoginForm/>}
        
        </div>
        
        </div>
        )
}
}



export default Home;
