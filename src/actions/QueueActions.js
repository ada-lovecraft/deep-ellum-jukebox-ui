import alt from '../alt';
import API from '../sources/APISource';
import _ from 'lodash';
import debug from 'debug';

let log = debug('QueueActions:log');
let fail = debug('QueueActions:error')

class QueueActions {

  constructor() {
    this.boundToSocket = false;
  }
  bindToSocket() {
    log('bindToSocket')
    if ( !this.boundToSocket ) {
      log('binding...')
      API.socket.on('updateQueue', this.actions.updateQueue.bind(this));
      API.socket.on('connect_error', function () {
        log('socket failed to connect... disconnecting');
        API.socket.disconnect();
      });
      this.dispatch({
        tracks: {}
      });
      this.boundToSocket = true;
    }

  }
  updateQueue(queue) {
    log('updating queue:', queue);
    this.dispatch(queue);
  }

  updatePersonalQueue(queue) {}

  addToQueue(track) {
    log('add to queue:', track);
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    API.addToQueue(track.id)
      .then(queue => {
        log('added to queue', queue)
        // we can access other actions within our action through `this.actions`
        this.actions.updatePersonalQueue(queue);
      })
      .catch((errorMessage) => {
        fail('errored adding to queue', arguments);
        this.actions.queueFailed(errorMessage);
      });
  }

  fetchQueue() {
    log('fetching queue');
    this.dispatch();
    API.fetchQueue()
      .then((queue) => {
        log('got queue', arguments);
        this.actions.updateQueue(queue);
      })
      .catch((errorMessage) => {
        fail('errored fetching queue', arguments);
        this.actions.queueFailed(errorMessage);
      });
  }
  queueFailed(errorMessage) {
    fail('queue failed', arguments);
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(QueueActions);
