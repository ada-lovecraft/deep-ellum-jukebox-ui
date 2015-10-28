import Q from 'q';
import io from 'socket.io-client';
import debug from 'debug';


let log = debug('API:log');
let fail = debug('API:error')

class APISource {
  constructor() {
    this.endpointURI = 'http://dej-api.ngrok.io/api';
    this.searchURI = `${this.endpointURI}/search`;
    this.queueURI = `${this.endpointURI}/queue`;
    this.tracksURI = `${this.endpointURI}/tracks/`
    this.socket = io.connect('http://dej-api.ngrok.io');
    this.useMock = false;
    this.searchResults = null;
  }

  searchTracks(query) {
    // returning a Promise because that is what fetch does.
    /*
    if ( this.useMock ) {
      return Q.delay(250)
        .then(() => {
          return SpotifyMock;
        })
        .then(response => {
          response.data.tracks = _.map(response.data.tracks, (track) => {
            track.popularity = parseFloat(track.popularity);
            return track;
          });
          response.data.tracks = _.sortByOrder(response.data.tracks, 'popularity', 'desc');
          this.searchResults = response.data.tracks;
          return response;
        });
    }
    */
    return fetch(`${this.searchURI}/tracks/${ encodeURIComponent(query)}`, {
      mode: 'cors'
    })
      .then(response => {
        log('search tracks:', response)
        return response.json()
      });
  }
  addToQueue(trackID) {
    console.log('[APISource] addToQueue:', trackID);
    return fetch(`${this.queueURI}/${trackID}`, {
      mode: 'cors',
      method: 'post'
    })
      .then(response => response.json());
  }


  fetchTrack(trackID) {
    /*
    if ( this.useMock ) {
      return Q.delay(250)
        .then(() => _.find(this.searchResults, (t) => t.id === track.trackId));
    }
    */
    let uri = `${this.tracksURI}${trackID}`
    console.log('[APISource] fetchTrack uri:', uri);
    return fetch(uri, {mode: 'cors'})
      .then(response => response.json());
  }

  fetchQueue() {
    /*
    if ( this.useMock ) {
      return Q.delay(250)
        .then(() => QueueMock);
    }
    */
    return fetch(`${this.queueURI}`, {mode: 'cors'})
      .then(response => response.json());
  }

}

export default new APISource()
