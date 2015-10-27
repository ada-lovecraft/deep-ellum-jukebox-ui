require('babel/register');
require('./vendor/jquery.slabtext.js');
require('./vendor/jQuery.wideText.js');
require('./vendor/jquery.jSlabify.js');

import React from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createHistory, useBasename } from 'history';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { AppComponent, Navigation } from './components';
import { HomePage, SearchPage, TrackDetailPage } from './pages';


require('./styles/App.css')


const history = useBasename(createHistory)()

render((
  <Router history={history}>
    <Route path="/" component={AppComponent}>
      <IndexRoute component={HomePage} />
      <Route path="search" component={SearchPage} />
      <Route path="tracks/:trackId" component={TrackDetailPage} />
    </Route>
  </Router>
  ), document.getElementById('app'))
