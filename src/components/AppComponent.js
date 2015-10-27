require('styles/paper-theme.css');
require('styles/App.css');
import React from 'react';
import { TestComponent, Header, CurrentlyPlayingComponent, Navigation, Menu } from './index';
import _ from 'lodash';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

class AppComponent extends React.Component {
  constructor(...args) {
    super(...args);
    console.log('[AppComponent] constructor: ', ...args);
  }

  render() {
    return (
    <div>
      <Navigation/>
      <div className="main-content">
        {this.props.children}
      </div>
    </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
