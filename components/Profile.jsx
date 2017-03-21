import React from 'react';
import ReactDOM from 'react-dom';

var stateKey = 'spotify_auth_state';
var results = [];

class Profile extends React.Component {
  constructor() {
    super();
    this.state ={
      id: '',
      country :'',
      name:'',
      email:'',
      product:'',
      image: '',
      playlists: [],
      trackList: []
    };
  }

  componentDidMount()
  {
    this.getProfile();
  }
  
  getHashParams () {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getProfile () {
    var params = this.getHashParams();
    var access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);

    var user_id = this.state.id;
    var playlist_id = this.state.playlists;


    localStorage.setItem(stateKey, access_token);
    if (access_token) {
      $.ajax({
        url: 'https://api.spotify.com/v1/me/',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          this.setState({
            id: response.id,
            country: response.country,
            name: response.display_name,
            email: response.email, 
            product: response.product,
            image: response.images[0].url,
          });
        }.bind(this),
      });
      $.ajax({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          var playlistItem;

          response.items.map((playlist, index) => {
            if (index >= 0) {  
              playlistItem = {
                id: playlist.id,
                name: playlist.name,
                external: playlist.external_urls.spotify,
                image: (playlist.images.length) ? playlist.images[0].url : null,
                tracks: playlist.tracks.total,
                owner: playlist.owner.id
              };
              results.push(playlistItem);
            }
          });
          this.setState({
            playlists: results
          });
        }.bind(this),
      });
    } else {
      console.log('something wrong')
    }
  }


  render() {  
   return (
    <div className ="profile">
      <img className= "profile-picture" src={this.state.image}/>
      <p>{this.state.name}</p>
      <p>{this.state.email}</p>
      <p>{this.state.product}</p>
      <p>{this.state.country}</p>
      <h2>My Playlists</h2>
      <div className="playlist">
      {this.state.playlists.map(playlist => (
        <PlaylistItem item={playlist} key={playlist.id} />

        ))}
      </div>
    </div>
    );
 }
}
class PlaylistItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      imagesWidth: {
        width: 300,
        height: 300
      }
    }
  }
  render () {
    return <div className="playlist-item">

    <div><a href={this.props.item.external} target="_blank"><img  src={this.props.item.image} style={this.state.imagesWidth} /></a></div>
    <div className="playlist-description">
    <p className="playlist-name">Play List Name</p><p>{this.props.item.name}</p>
    <p className="playlist-name"># of Tracks</p><p>{this.props.item.tracks}</p>
    </div>
    </div>
  }
}

export default Profile;