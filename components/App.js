import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Container } from './Container.js';
import { WorkLoadOptimator } from './pages/WorkLoadOptimator.js';

export default class App extends Component {

  render () {

    return (
    	<div>
	      <Router history={hashHistory}>
	        <Route path='/' component={Container}>
	          <IndexRoute component={WorkLoadOptimator} />
	          <Route path='*' component={WorkLoadOptimator} />
	        </Route>
	      </Router>
      </div>
    );
  }
}
