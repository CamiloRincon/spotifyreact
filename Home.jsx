import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
   render() {
      return (
         <div>
            <SearchBox url="https://api.spotify.com/v1/search" />
         </div>
      )
   }
}

var SearchBox = React.createClass({
  handleCommentSubmit: function(query) {
    fetch(this.props.url + '?q=' + query.artist + '&type=album')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            this.setState({data: data.albums.items});
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
      return(
        <li key={i}>
          <img src={album.images[1].url} width={album.images[1].width} height={album.images[1].height} />
          <p>{album.name}</p>
        </li>
      );
    });
    return (
      <ul className="search-list list-unstyled">
        {nodes}
      </ul>
    );
  }
});
export default Home;
