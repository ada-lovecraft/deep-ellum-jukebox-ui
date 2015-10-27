require('../styles/navigation.css');
import React from 'react';
import { Input, Glyphicon, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SearchActions } from '../actions';
import { connectHistory } from '../hocs';
import { TrackStore } from '../stores';
import Spinner from 'react-spinkit';


class Navigation extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchQuery: null
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.doSearch = _(this.doSearch)
    .bind(this)
    .debounce(500)
    .value();
    this.handleTracklistChange = this.handleTracklistChange.bind(this);

  }

   componentDidMount() {
    TrackStore.listen(this.handleTracklistChange);
  }

  componentWillUnmount() {
    TrackStore.unlisten(this.handleTracklistChange);
  }

  handleTracklistChange(state) {
    if(state.tracks.length) {
      this.setState({isLoading: false});
    }

  }

  handleClearInput() {
    this.setState({isLoading: false, searchQuery: ''});
    SearchActions.clearSearchResults();
  }

  handleHomeClick() {
    this.handleClearInput();
    this.props.history.pushState(null, '/');
  }

  handleSearchChange(query) {
    if(query.length) {
      this.setState({searchQuery: query, isLoading: true});

        this.doSearch(query);
        if(!this.props.history.isActive('/search')) {
          this.props.history.pushState(null, '/search');
        }
    } else {
      console.log('nope!');
      this.handleClearInput()
    }

  }

  doSearch(query) {
    console.log('[doSearch]:', query);
    SearchActions.clearSearchResults();
    SearchActions.searchTracks(query);
  }


  render() {

    let valueLink = {
      value: this.state.searchQuery,
      requestChange: this.handleSearchChange
    };


    /*
    if(this.state.isLoading) {
      feedback = (<Spinner spinnerName='double-bounce' />)
    }*/
    let glyph;
    if(!this.state.searchQuery) {
      glyph = <Glyphicon glyph="search" className="right-button"/>;
    } else if(this.state.isLoading) {
      glyph = <Glyphicon glyph="refresh"  onClick={this.handleClearInput} className="right-button animate-spin"/>;
    } else {
      glyph = <Glyphicon glyph="remove-sign"  onClick={this.handleClearInput} className="right-button"/>;
    }
    return (
    <div className="fixed-search-bar">
      <Input type="text"
        bsSize="large"
        valueLink={valueLink}
        placeholder="Search Songs..."
        ref="searchBar"
        hasFeedback/>
        {glyph}
        <Glyphicon glyph="home" onClick={this.handleHomeClick} className="left-button"/>
    </div>
    );
  }
}

export default connectHistory(Navigation);
