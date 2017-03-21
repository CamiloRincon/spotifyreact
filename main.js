import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import SearchResults from './components/SearchResults.jsx';



ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "search" component = {SearchResults} />
      </Route>
   </Router>

), document.getElementById('app'))

