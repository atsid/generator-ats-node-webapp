const autohandle = require('app/components/autohandle');

/**
 * The user repository provides an layer of abstraction over the persistence layer. It gives clients a promise-based
 * API to search for entities with.
 */
class UserRepository {
  constructor(models) {
    this._models = models;
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      return this._models.User.findById(id, autohandle(resolve, reject));
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this._models.User.findOne({email: email}, autohandle(resolve, reject));
    });
  }

  findOneByCriteria(criteria) {
    return new Promise((resolve, reject) => {
      this._models.User.findOne(criteria, autohandle(resolve, reject));
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this._models.User.create(data, autohandle(resolve, reject));
    });
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      this._models.User.remove(autohandle(resolve, reject));
    });
  }
}
module.exports = UserRepository;
