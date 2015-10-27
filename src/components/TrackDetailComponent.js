import React from 'react';
import { TrackStore, QueueStore } from '../stores';
import { SearchActions, QueueActions } from '../actions';
import Q from 'q';
import { Link } from 'react-router';
import { Grid, Input, Row, Col, Table, ProgressBar, Button, Glyphicon, Dropdown, MenuItem, Image } from 'react-bootstrap';
import _ from 'lodash';
import debug from 'debug';

let log = debug('TrackDetailComponent:log');
let fail = debug('TrackDetailComponent:error')

class TrackDetailComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      trackDetails: null,
      isLoading: false,
      hasQueued: false
    };
    this.handleTrackDetailsChange = this.handleTrackDetailsChange.bind(this);
    this.handleEnqueue = this.handleEnqueue.bind(this);
    this.handlePersonalQueueChange = this.handlePersonalQueueChange.bind(this);
  }

  componentDidMount() {
    TrackStore.listen(this.handleTrackDetailsChange);
    QueueStore.listen(this.handlePersonalQueueChange);
    SearchActions.fetchTrackDetails(this.props.trackID);
  }

  componentWillUnmount() {
    TrackStore.unlisten(this.handleTrackDetailsChange);
    QueueStore.unlisten(this.handlePersonalQueueChange);
  }


  handleTrackDetailsChange(state) {
    log('handleTrackDetailsChange:', state)
    this.setState({trackDetails: state.trackDetails});
  }

  handlePersonalQueueChange(state) {
    log('handlePersonalQueueChange', state);
    if ( _.find(state.personalQueue, 'id', this.state.trackDetails.id) ) {
      log('personalQueue updated', state.personalQueue);
      this.setState({isLoading: false, hasQueued: true});
    }
  }

  handleQueueChange(state) {
    if ( state.queue.next ) {
      this.setState({isLoading: false, hasQueued: true});
    }

  }

  handleEnqueue() {
    log('handleEnqueue');
    this.setState({isLoading: true});
    QueueActions.addToQueue(this.state.trackDetails);

  }



  formatTrackLength(ms) {
    let minutes = (ms / 1000 / 60);
    let seconds = (minutes - _.floor(minutes)) * 60;
    let format = `${ _.floor(minutes)}:${ _.padLeft(_.round(seconds), 2, '0')}`;
    log('formatTrackLength:', format);
    return format;
  }

  render() {

    let body = (<div></div>);
    let buttonText = (<span>Add to Queue &nbsp; <Glyphicon glyph="plus" /></span>);
    let buttonDisabled = false;
    if ( this.state.isLoading ) {
      buttonDisabled = true;
      buttonText = (<span>Loading... <Glyphicon glyph="repeat" /></span>);
    } else if ( this.state.hasQueued ) {
      buttonDisabled = true;
      buttonText = (<span>Song Queued</span>);
    }
    if ( !this.state.trackDetails ) {
      body = (
        <Row>
          <Col xs={12}>
            <ProgressBar now={100} active />
          </Col>
        </Row>

      );
    } else if ( this.state.trackDetails ) {
      let track = this.state.trackDetails;
      body = (
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <span><Link to={`/search`}> <Glyphicon glyph="chevron-left" /> Back To Search </Link></span>
              <p>
                <Image src={track.album.images[ 0 ].url} responsive/>
              </p>
              <div className="track-title">
                {track.name}
              </div>
              <div className="track-artist">
                {track.artists[ 0 ].name}
                <div className="pull-right">
                  {this.formatTrackLength(track.durationMs)}
                </div>
              </div>
              <p>
                <Button bsSize="large"
                  disabled={buttonDisabled}
                  block
                  onClick={this.handleEnqueue}>
                  {buttonText}
                </Button>
              </p>
            </Col>
          </Row>
        </Grid>

      );
    }

    return body
  }
}


export default TrackDetailComponent;
