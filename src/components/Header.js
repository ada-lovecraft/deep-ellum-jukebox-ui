import React from 'react';

import { Grid, Row, Col, Button, Glyphicon, Input } from 'react-bootstrap';
import FitterHappierText from 'react-fitter-happier-text';
import ReactFitText from 'react-fittext';
import { Hatchshow, FullScreenSearch, BigText } from './index';


class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {searchQuery: ''};

    this.handleInput = _.bind(this.handleInput, this);
    this.searchLink = {
      value: this.state.searchQuery,
      requestChange: this.handleInput
    };


  }


  handleInput(event) {
    let query = event.target.value;
    this.setState({searchQuery: query});
    if ( query.length >= 4 ) {
      _.delay(() => this.setState({searchQuery: ''}), 1000);
    }
  }

  render() {
    return (
    <header>
      <Row className="intro-text">
        <Col xs={8}
          sm={6}
          md={5}
          lg={4}
          className="intro-heading">
          <Hatchshow>
            DEEP
          </Hatchshow>
          <Hatchshow>
            ELLUM
          </Hatchshow>
          <Hatchshow>
            JUKEBOX
          </Hatchshow>
          <Hatchshow>
            .COM
          </Hatchshow>
        </Col>
      </Row>
    </header>
    );
  }
}

export default Header;
