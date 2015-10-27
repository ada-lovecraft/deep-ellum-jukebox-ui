require('../styles/full-screen-search.css');

import React from 'react';
import { Button, Input, Glyphicon, Dropdown, MenuItem, Grid, Row, Col, Table, Image } from 'react-bootstrap';
import classNames from 'classnames';
import { watchViewport } from '../hocs';


import { SearchActions, QueueActions } from '../actions';
import { TrackStore } from '../stores';
import SearchResults from './SearchResults';


class FullScreenSearch extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      query: null,
      isOpen: false,
      trackList: TrackStore.getState()
    };

    this.searchBar = null;


    // Bind
    this.onTracklistChange = this.onTracklistChange.bind(this);
    this.handleInput = _.bind(this.handleInput, this);

    this.doSearch = _(this.doSearch)
      .bind(this)
      .debounce(500)
      .value();

    this.openOverlay = _.bind(this.openOverlay, this);
    this.closeOverlay = _.bind(this.closeOverlay, this);

    this.searchLink = {
      value: this.state.query,
      requestChange: this.handleInput
    };
  }

  // Life Cycle Methods

  componentDidMount() {
    TrackStore.listen(this.onTracklistChange);
  }
  componentWillUnmount() {
    TrackStore.unlisten(this.onTracklistChange);
  }
  componentWillReceiveProps(nextProps) {
    if ( nextProps.shouldOpen && !this.state.isOpen ) {
      this.openOverlay(nextProps.searchText);
    }
  }

  // Store Listeners
  onTracklistChange(trackList) {
    console.log('[FullScreenSearch]: onTracklistChange', arguments);
    this.setState({trackList: TrackStore.getState()});
  }

  // Interaction Handlers
  handleInput(event) {
    let query = event.target.value;
    console.log('[FullScreenSearch]: handling input with query:', query);
    SearchActions.clearSearchResults();
    this.setState({query: query});
    this.doSearch(query);
  }

  doSearch(query) {
    console.log(`[FullScreenSearch]: doSearch(${query})`);
    SearchActions.searchTracks(query);
  }


  openOverlay(query) {
    console.log('[FullScreenSearch]: opening with query:', query);
    this.setState({isOpen: true, query: query});
    this.searchBar.refs.input.focus();
    this.doSearch(query);
  }

  closeOverlay() {
    this.setState({isOpen: false, query: null});
  }

  render() {
    let searchClass = classNames({
      'full-screen-search': true,
      'open': this.state.isOpen
    });
    let body = <div></div>;
    if ( this.state.trackList.tracks.length ) {
      body = <SearchResults tracks={this.state.trackList.tracks}
               perRow={4}
               viewport={this.props.viewport} />
    }
    let node = <Grid fluid className={searchClass}>
                 <Row>
                   <Col xs={1}>
                     <button type="button"
                       className="close pull-right"
                       onClick={this.closeOverlay}>
                       ×
                     </button>
                   </Col>
                   <Col xs={11}>
                     <Input type="search"
                       value={this.state.query}
                       onChange={this.handleInput}
                       placeholder="Find a song..."
                       ref={(c) => this.searchBar = c} />
                   </Col>
                 </Row>
                 {body}
               </Grid>

    return node;
  }
}

export default watchViewport(FullScreenSearch);
