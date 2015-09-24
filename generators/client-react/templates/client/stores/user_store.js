const debug = require('debug')('app:stores:project_store');
const request = require('superagent-bluebird-promise');

/**
 * A data store for Projects
 */
class UserStore {
  constructor() {
    this.state = {
      currentUser: null,
      currentUserPromise: null,
    };
  }

  getCurrentUser() {
    let promise;
    if (this.state.currentUser) {
      promise = Promise.resolve(this.state.currentUser.result);
    } else if (this.state.currentUserPromise) {
      promise = this.state.currentUserPromise;
    } else {
      promise = this.state.currentUserPromise = request.get('/api/auth/current')
        .then((res) => {
          debug('current user: ', res.body);
          this.state.currentUser = {result: res.body};
          return res.body;
        })
        .catch((err) => {
          debug('error getting current user', err);
          this.state.currentUser = {result: null};
          return null;
        });
    }
    return promise;
  }
}

module.exports = UserStore;
