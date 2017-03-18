import React from 'react';
import ReactDOM from 'react-dom';
class Home extends React.Component {
   render() {
      return (
         <div>
         <SearchBox url="https://api.spotify.com/v1/search" />
         <Profile/>
         </div>
         )
  }
}

var stateKey = 'spotify_auth_state';

var Profile = React.createClass({
  getHashParams: function(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    console.log('que es ',hashParams)
    return hashParams;
    },
    componentWillMount:function() {
        this.getProfile();
    },
    getProfile: function() {
    var params = this.getHashParams();
    var access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);
    console.log('aca quw',access_token ,params.state, storedState);

            localStorage.removeItem(stateKey);
            if (access_token) {
                console.log('el access',access_token);
                $.ajax({
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
            } else {
                console.log('other');
            }

        
    },
    render: function() {
        return (
           <div></div>
            );
    }
})

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
export default Home;
