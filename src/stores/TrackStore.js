import alt from '../alt'
import SearchActions from '../actions/SearchActions';


class TrackStore {
  constructor() {
    this.tracks = [ ];
    this.trackDetails = null;
    this.meta = null;
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateSearchResults: SearchActions.UPDATE_SEARCH_RESULTS,
      handleUpdateTrackDetails: SearchActions.UPDATE_TRACK_DETAILS,
      handleClearTracks: SearchActions.CLEAR_SEARCH_RESULTS,
      handleSearchTracks: SearchActions.SEARCH_TRACKS,
      handleFetchTrackDetails: SearchActions.FETCH_TRACK_DETAILS,
      handleSearchFailed: SearchActions.SEARCH_FAILED
    });
  }
  handleUpdateSearchResults(results) {
    console.log('[TrackStore]: handleUpdateTracks:', arguments);
    this.tracks = results.data;
    this.meta = results.meta;

    this.errorMessage = null;
  }

  handleUpdateTrackDetails(results) {
    this.trackDetails = results;
  }
  handleSearchTracks() {
    console.log('[TrackStore]: handleSearchTracks');
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.tracks = [ ];
    this.meta = null;
  }
  handleFetchTrackDetails(result) {
    this.trackDetails = null;
  }

  handleClearTracks() {
    this.tracks = [ ];
    this.meta = null;
  }

  handleSearchFailed(errorMessage) {
    console.log('[TrackStore]: handleTracksFailed:', arguments);
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(TrackStore, 'TrackStore');
