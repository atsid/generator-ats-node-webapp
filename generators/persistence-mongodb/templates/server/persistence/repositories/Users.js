/**
 * The user repository provides an layer of abstraction over the persistence layer. It gives clients a promise-based
 * API to search for entities with.
 */
class UserRepository {
  constructor(models) {
    this.models = models;
  }

  findById(id) {
    return this.models.User.findByIdQ(id);
  }

  findByEmail(email) {
    return this.models.User.findOneQ({email: email});
  }

  findOneByCriteria(criteria) {
    return this.models.User.findOneQ(criteria);
  }

  create(data) {
    return this.models.User.createQ(data);
  }
}
module.exports = UserRepository;
