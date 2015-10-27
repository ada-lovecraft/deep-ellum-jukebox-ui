import React from 'react';
import { TrackDetailComponent } from '../components';
import { Grid, Row, Col } from 'react-bootstrap';


export default function TrackDetailPage(props) {
  console.log('props:', props);
  return <div className="track-detail-page">
           <TrackDetailComponent trackID={props.routeParams.trackId} />
         </div>
}
