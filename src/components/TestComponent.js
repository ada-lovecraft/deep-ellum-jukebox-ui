import React, { Component } from 'react';

import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { watchViewport } from '../hocs';

class TestComponent extends Component {

  constructor(...props) {
    super(...props);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.viewport !== nextProps.viewport ) {
    }
  }

  test(somethings) {
    console.log('somethings:', somethings);
  }
  render() {
    return (
    <div>
      <h1 id="widthDisplay" className="rotate">width: {this.props.viewport.width}</h1>
      <h1 id="heightDisplay">height: {this.props.viewport.height}</h1>
    </div>
    );
  }
}



export default watchViewport(TestComponent);
