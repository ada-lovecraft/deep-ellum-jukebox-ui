import alt from '../alt';
import API from '../sources/APISource';

class SearchActions {
  updateSearchResults(results) {
    console.log('[SearchActions]: updating results:', results);
    this.dispatch(results);
  }

  updateTrackDetails(result) {
    this.dispatch(result);
  }

  clearSearchResults() {
    this.dispatch();
  }

  fetchTrackDetails(trackId) {
    console.log('[SearchActions] fetchTrackDetails:', trackId);
    this.dispatch();
    API.fetchTrack(trackId)
      .then(result => {
        this.actions.updateTrackDetails(result);
      })
      .catch((errorMessage) => {
        console.log('errored tracks', arguments);
        this.actions.searchFailed(errorMessage);
      });
  }

  searchTracks(query) {
    console.log('[SearchActions]: tracks query:', query);
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    API.searchTracks(query)
      .then((results) => {
        console.log('got search results', results)
        // we can access other actions within our action through `this.actions`
        this.actions.updateSearchResults(results);
      })
      .catch((errorMessage) => {
        console.log('errored tracks', arguments);
        this.actions.searchFailed(errorMessage);
      });
  }

  searchFailed(errorMessage) {
    console.log('SearchActions: tracks failed', arguments);
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(SearchActions);
