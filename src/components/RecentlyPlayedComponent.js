require('../styles/recently-played.css');
import React from 'react';
import { QueueStore } from '../stores';
import { QueueActions } from '../actions';
import { FlexHeading } from './';
import debug from 'debug';

let log = debug('RecentlyPlayed:log');
let fail = debug('RecentlyPlayed:error');




import { Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';



class RecentlyPlayedComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = QueueStore.getState();
    log('constructor', this.state)
    this.handleQueueChange = this.handleQueueChange.bind(this);
  }


  componentDidMount() {
    QueueStore.listen(this.handleQueueChange);
    QueueActions.bindToSocket();
    QueueActions.fetchQueue();

  }
  componentWillUnmount() {
    QueueStore.unlisten(this.handleQueueChange);
  }


  handleQueueChange(state) {
    log('handleQueueChange', state);
    this.setState(state);
  }


  formatTrackLength(ms) {
    let minutes = (ms / 1000 / 60);
    let seconds = (minutes - _.floor(minutes)) * 60;
    return `${ _.floor(minutes)}:${ _.padLeft(_.round(seconds), 2, '0')}`;
  }



  render() {
    let track = _.get(this.state, 'queue.current');
    if ( track ) {
      return (
      <div className="recently-played">
        <FlexHeading>
          Recently Played
        </FlexHeading>
        {_.map(this.state.queue.previous, track => (
         <Row key={track.id} className="track">
           <Col xs={2} className="no-right-padding">
             <Image src={track.album.images[ 0 ].url} responsive/>
           </Col>
           <Col xs={10}>
             <div className="track-title">
               {track.name}
             </div>
             <div className="track-artist">
               {track.artists[ 0 ].name}
             </div>
             <div className="track-album">
               {track.album.name}
             </div>
           </Col>
         </Row>
         ))}
      </div>

      );
    } else {
      return (<div className="currently-playing"></div>);
    }
  }
}

RecentlyPlayedComponent.defaultProps = {};

export default RecentlyPlayedComponent;
