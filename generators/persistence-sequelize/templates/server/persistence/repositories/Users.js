/**
 * The user repository provides an layer of abstraction over the persistence layer. It gives clients a promise-based
 * API to search for entities with.
 */
class UserRepository {
  constructor(models) {
    this.models = models;
  }

  findById(id) {
    return this.models.User.findById(id);
  }

  findByEmail(email) {
    return this.models.User.findOne({where: {email}});
  }

  findOneByCriteria(criteria) {
    return this.models.User.findOne({where: criteria});
  }

  create(data) {
    return this.models.User.create(data);
  }

  deleteAll() {
    return this.models.User.destroy({where: {}});
  }
}
module.exports = UserRepository;
