import React from 'react';
import { Header, CurrentlyPlayingComponent, RecentlyPlayedComponent } from '../components';
import { Grid, Row, Col } from 'react-bootstrap';

export default function HomePage(props) {
  return <div>
           <Header/>
           <CurrentlyPlayingComponent/>
           <RecentlyPlayedComponent/>
         </div>
}
