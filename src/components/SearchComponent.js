import React from 'react';
import { TrackStore } from '../stores';
import { SearchActions } from '../actions';
import Q from 'q';
import { LinkContainer } from 'react-router-bootstrap';



import { Grid, Input, Row, Col, Table, ProgressBar, Button, Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

class SearchComponent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      trackList: TrackStore.getState().tracks,
      okMessage: ''
    };

    this.handleTracklistChange = this.handleTracklistChange.bind(this);


  }

  componentDidMount() {
    TrackStore.listen(this.handleTracklistChange);
  }

  componentWillUnmount() {
    TrackStore.unlisten(this.handleTracklistChange);
  }

  handleTracklistChange(state) {
    console.log('Search Component: handleTracklistChange', state);
    this.setState({trackList: state.tracks});
  }

  render() {
    let body = (
    <Row>
      <Col xs={12}>
        <Table>
          <tbody>
            {_.map(this.state.trackList, track => (
             <LinkContainer to={`/tracks/${track.id}`} key={track.id}>
               <tr>
                 <td>
                   {track.name}
                 </td>
                 <td>
                   {track.artists[ 0 ].name}
                 </td>
               </tr>
             </LinkContainer>
             )
             )}
          </tbody>
        </Table>
      </Col>
    </Row>

    );




    return (
    <div className='search-component'>
      <Row>
        <Col xs={12}>
          {body}
        </Col>
      </Row>
    </div>
    );
  }
}

SearchComponent.defaultProps = {};

export default SearchComponent;
