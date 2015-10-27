require('babel/register');
require('../vendor/jquery.slabtext.js');
require('../vendor/jQuery.wideText.js');
require('../vendor/jquery.jSlabify.js');

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, Link } from 'react-router';






injectTapEventPlugin();

// Render the main component into the dom
ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
    <Route name="search" path="/search" component=, document.getElementById('app'));
