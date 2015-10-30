const log = require('log4js').getLogger('app:stores:project_store');
const request = require('superagent');

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
      promise = this.state.currentUserPromise = new Promise((resolve, reject) => {
        request.get('/api/auth/current').end((err, res) => {
          if (err) {
            this.state.currentUser = {result: null};
            if (err.status === 404) {
              resolve(null);
            } else {
              log.debug('error getting current user', err.message, err.body, err.status);
              reject(err);
            }
          } else {
            log.debug('current user: ', res.body);
            this.state.currentUser = {result: res.body};
            resolve(res.body);
          }
        });
      });
    }
    return promise;
  }
}

module.exports = UserStore;
