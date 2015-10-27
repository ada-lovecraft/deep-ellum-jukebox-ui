import alt from '../alt'
import QueueActions from '../actions/QueueActions';
import debug from 'debug';

let log = debug('QueueStore:log');
let fail = debug('QueueStore:error')



class QueueStore {
  constructor() {
    this.queue = [ ];
    this.personalQueue = [ ];
    this.errorMessage = null;
    this.bindListeners({
      handleBindToSocket: QueueActions.BIND_TO_SOCKET,
      handleUpdateQueue: QueueActions.UPDATE_QUEUE,
      handleUpdatePersonalQueue: QueueActions.UPDATE_PERSONAL_QUEUE,
      handleAddToQueue: QueueActions.ADD_TO_QUEUE,
      handleQueueFailed: QueueActions.QUEUE_FAILED
    });
  }
  handleBindToSocket() {
    log('handleBindToSocket');
  }
  handleUpdateQueue(queue) {
    log('handleUpdateQueue:', arguments);
    this.queue = queue;
    this.errorMessage = null;
  }
  handleUpdatePersonalQueue(queue) {
    log('handleUpdatePersonalQueue:', arguments);
    this.personalQueue = queue;
    this.errorMessage = null;
  }
  handleAddToQueue() {
    log('handleAddToQueue:', arguments);
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.tracks = [ ];
  }

  handleQueueFailed(errorMessage) {
    log('store: handleQueueFailed:', arguments);
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(QueueStore, 'QueueStore');
